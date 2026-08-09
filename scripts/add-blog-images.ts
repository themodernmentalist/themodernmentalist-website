import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const projectId = "3wy40soi";
const dataset = "production";
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing auth token: run via `sanity exec --with-user-token`");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function main() {
  const dir = "/tmp/blog-images";
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".jpg"));

  for (const file of files) {
    const slug = file.replace(/\.jpg$/, "");
    const filePath = path.join(dir, file);
    const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
      filename: file,
    });

    await client
      .patch(`post-${slug}`)
      .set({
        mainImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      })
      .commit();

    console.log(`✔ ${slug}`);
  }

  console.log(`\nDone. Added images to ${files.length} posts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
