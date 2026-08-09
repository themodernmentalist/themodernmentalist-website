import type { MetadataRoute } from "next";
import { client } from "../../sanity/lib/client";
import { SITEMAP_POSTS_QUERY } from "../../sanity/lib/queries";

const SITE_URL = "https://themodernmentalist.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/corporate`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/weddings`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/private-events`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  let posts: { slug: string; _updatedAt: string }[] = [];
  try {
    posts = await client.fetch(SITEMAP_POSTS_QUERY);
  } catch {
    posts = [];
  }

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes];
}
