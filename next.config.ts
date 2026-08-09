import type { NextConfig } from "next";

const oldSiteRedirect = (source: string, destination: string) => ({
  source,
  destination,
  permanent: true,
  has: [
    {
      type: "host" as const,
      value: "(www\\.)?londonmindmagician\\.com",
    },
  ],
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      oldSiteRedirect("/corporateevents", "https://themodernmentalist.com/corporate"),
      oldSiteRedirect("/privateevents", "https://themodernmentalist.com/private-events"),
      oldSiteRedirect("/weddings", "https://themodernmentalist.com/weddings"),
      oldSiteRedirect("/about", "https://themodernmentalist.com/about"),
      oldSiteRedirect("/contact", "https://themodernmentalist.com/#enquire"),
      oldSiteRedirect("/blog", "https://themodernmentalist.com/blog"),
      oldSiteRedirect("/", "https://themodernmentalist.com"),
    ];
  },
};

export default nextConfig;
