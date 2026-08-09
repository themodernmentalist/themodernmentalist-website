import type { MetadataRoute } from "next";

const SITE_URL = "https://themodernmentalist.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
        disallow: ["/studio"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
