// Publishes ONLY the posts named in SLUGS (and attaches images from IMAGE_DIR).
// Never touches other posts. Run: npx sanity exec scripts/publish-posts.ts --with-user-token
// Set DRY=1 to preview without writing.
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN;
if (!token) throw new Error("Run via `sanity exec --with-user-token`");
const DRY = process.env.DRY === "1";
const SLUGS = (process.env.SLUGS || "").split(",").filter(Boolean);
const IMAGE_DIR = process.env.IMAGE_DIR || "/tmp/blog-images-new";

const client = createClient({
  projectId: "3wy40soi",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const key = () => Math.random().toString(36).slice(2, 10);
const span = (text: string, marks: string[] = []) => ({ _type: "span", _key: key(), text, marks });
const block = (style: string, text: string) => ({
  _type: "block", _key: key(), style, children: [span(text)], markDefs: [],
});
const bullet = (text: string) => {
  const m = text.match(/^\*\*(.+?)\*\*\s*(?:—|-|:)?\s*(.*)$/);
  return {
    _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, markDefs: [],
    children: m ? [span(m[1], ["strong"]), span(m[2] ? ` ${m[2]}` : "")] : [span(text.replace(/\*\*/g, ""))],
  };
};

function toBlocks(md: string) {
  const out: unknown[] = [];
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ")) out.push(block("h2", line.slice(3).trim()));
    else if (line.startsWith("### ")) out.push(block("h3", line.slice(4).trim()));
    else if (line.startsWith("- ")) out.push(bullet(line.slice(2).trim()));
    else if (/^\d+\.\s/.test(line)) out.push(bullet(line.replace(/^\d+\.\s/, "")));
    else out.push(block("normal", line.replace(/\*\*(.+?)\*\*/g, "$1")));
  }
  return out;
}

function parse(file: string) {
  const raw = fs.readFileSync(file, "utf-8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`No frontmatter: ${file}`);
  const data: Record<string, string> = {};
  for (const l of m[1].split("\n")) {
    const i = l.indexOf(":");
    if (i < 0) continue;
    let v = l.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    data[l.slice(0, i).trim()] = v;
  }
  let body = m[2];
  const faqs: { question: string; answer: string; _key: string }[] = [];
  const h = body.match(/\n###\s*FAQs?\s*\n/i);
  if (h && h.index !== undefined) {
    const section = body.slice(h.index + h[0].length);
    body = body.slice(0, h.index);
    const re = /\*\*(.+?)\*\*\s*\n(.+?)(?=\n\*\*|\n*$)/gs;
    let q: RegExpExecArray | null;
    while ((q = re.exec(section))) faqs.push({ question: q[1].trim(), answer: q[2].trim().replace(/\n/g, " "), _key: key() });
  }
  return { data, body, faqs };
}

async function attachImage(id: string, slug: string) {
  const img = path.join(IMAGE_DIR, `${slug}.jpg`);
  if (!fs.existsSync(img)) return console.log(`  (no image for ${slug})`);
  if (DRY) return console.log(`  would upload ${img} and attach to ${id}`);
  const asset = await client.assets.upload("image", fs.createReadStream(img), { filename: `${slug}.jpg` });
  await client.patch(id).set({ mainImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } }).commit();
  console.log(`  image attached to ${id}`);
}

async function main() {
  for (const slug of SLUGS) {
    const found = await client.fetch<string | null>(`*[_type=="post" && slug.current==$slug][0]._id`, { slug });
    const id = found || `post-${slug}`;
    const existing = !!found;
    const file = path.join(process.cwd(), "content/blog", `${slug}.md`);
    if (existing) {
      console.log(`${slug}: already live, leaving text untouched`);
    } else {
      const { data, body, faqs } = parse(file);
      const doc = {
        _id: id, _type: "post", title: data.title, slug: { _type: "slug", current: data.slug },
        category: data.category, excerpt: data.excerpt,
        publishedAt: new Date(data.publishedAt).toISOString(),
        body: toBlocks(body), faqs: faqs.length ? faqs : undefined,
      };
      console.log(`${slug}: ${DRY ? "would create" : "creating"} (${doc.body.length} blocks, ${faqs.length} FAQs)`);
      if (!DRY) await client.createOrReplace(doc);
    }
    await attachImage(id, slug);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
