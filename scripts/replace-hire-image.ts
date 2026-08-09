import { createClient } from "@sanity/client";
import fs from "node:fs";

const projectId = "3wy40soi";
const dataset = "production";
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing auth token: run via `sanity exec --with-user-token`");
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

async function main() {
  const filePath = "/tmp/blog-images-v2/hire-a-mentalist-in-london.jpg";
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: "hire-a-mentalist-in-london.jpg",
  });

  await client
    .patch("post-hire-a-mentalist-in-london")
    .set({
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    })
    .commit();

  console.log("✔ replaced image for hire-a-mentalist-in-london");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
