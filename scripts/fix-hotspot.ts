import { createClient } from "@sanity/client";

const projectId = "3wy40soi";
const dataset = "production";
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing auth token: run via `sanity exec --with-user-token`");
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

async function main() {
  const doc = await client.getDocument("post-hire-a-mentalist-in-london");
  if (!doc?.mainImage) throw new Error("Post or mainImage not found");

  await client
    .patch("post-hire-a-mentalist-in-london")
    .set({
      "mainImage.hotspot": { _type: "sanity.imageHotspot", x: 0.5, y: 0.22, height: 0.3, width: 0.3 },
      "mainImage.crop": { _type: "sanity.imageCrop", top: 0, bottom: 0.35, left: 0.1, right: 0.1 },
    })
    .commit();

  console.log("✔ hotspot/crop set for hire-a-mentalist-in-london");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
