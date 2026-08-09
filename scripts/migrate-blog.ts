import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_WRITE_TOKEN"
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type Frontmatter = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
};

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("No frontmatter found");
  const [, frontmatterBlock, body] = match;
  const data: Record<string, string> = {};
  for (const line of frontmatterBlock.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data: data as unknown as Frontmatter, body };
}

function key() {
  return Math.random().toString(36).slice(2, 10);
}

function textBlock(style: string, text: string) {
  return {
    _type: "block",
    _key: key(),
    style,
    children: [{ _type: "span", _key: key(), text, marks: [] }],
    markDefs: [],
  };
}

function listItemBlock(text: string) {
  // Strip leading **Bold** marker into a bold span, rest as normal span.
  const boldMatch = text.match(/^\*\*(.+?)\*\*\s*(?:—|-|:)?\s*(.*)$/);
  const children = boldMatch
    ? [
        { _type: "span", _key: key(), text: boldMatch[1], marks: ["strong"] },
        { _type: "span", _key: key(), text: boldMatch[2] ? ` ${boldMatch[2]}` : "", marks: [] },
      ]
    : [{ _type: "span", _key: key(), text: text.replace(/\*\*/g, ""), marks: [] }];
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    children,
    markDefs: [],
  };
}

function stripInlineBold(text: string) {
  return text;
}

function markdownToBlocks(md: string) {
  const lines = md.split("\n");
  const blocks: unknown[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(textBlock("h2", line.slice(3).trim()));
    } else if (line.startsWith("### ")) {
      blocks.push(textBlock("h3", line.slice(4).trim()));
    } else if (line.startsWith("- ")) {
      blocks.push(listItemBlock(line.slice(2).trim()));
    } else {
      // Handle bold inline text as a plain paragraph (marks simplified).
      const boldStripped = line.replace(/\*\*(.+?)\*\*/g, "$1");
      blocks.push(textBlock("normal", stripInlineBold(boldStripped)));
    }
    i++;
  }
  return blocks;
}

function extractFaqs(body: string): { body: string; faqs: { question: string; answer: string }[] } {
  const faqHeadingMatch = body.match(/\n###\s*FAQs?\s*\n/i);
  if (!faqHeadingMatch || faqHeadingMatch.index === undefined) {
    return { body, faqs: [] };
  }
  const mainBody = body.slice(0, faqHeadingMatch.index);
  const faqSection = body.slice(faqHeadingMatch.index + faqHeadingMatch[0].length);

  const faqs: { question: string; answer: string }[] = [];
  const qaRegex = /\*\*(.+?)\*\*\s*\n(.+?)(?=\n\*\*|\n*$)/gs;
  let m: RegExpExecArray | null;
  while ((m = qaRegex.exec(faqSection)) !== null) {
    faqs.push({
      question: m[1].trim(),
      answer: m[2].trim().replace(/\n/g, " "),
    });
  }
  return { body: mainBody, faqs };
}

async function main() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, body } = parseFrontmatter(raw);
    const { body: mainBody, faqs } = extractFaqs(body);
    const blocks = markdownToBlocks(mainBody);

    const doc = {
      _id: `post-${data.slug}`,
      _type: "post",
      title: data.title,
      slug: { _type: "slug", current: data.slug },
      category: data.category,
      excerpt: data.excerpt,
      publishedAt: new Date(data.publishedAt).toISOString(),
      body: blocks,
      faqs: faqs.length ? faqs.map((f) => ({ ...f, _key: key() })) : undefined,
    };

    await client.createOrReplace(doc);
    console.log(`✔ ${data.slug} (${faqs.length} FAQs)`);
  }

  console.log(`\nDone. Migrated ${files.length} posts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
