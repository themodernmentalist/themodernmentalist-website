import type { Metadata } from "next";
import Nav from "@/components/Nav";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";
import { client } from "../../../sanity/lib/client";
import { POSTS_QUERY } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog | Edwin Todd, The Modern Mentalist",
  description:
    "Thoughts on mentalism, event entertainment, and what it takes to make a room feel unforgettable.",
  alternates: {
    canonical: "/blog",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <>
      <Nav />
      <BlogHeader />
      <BlogGrid posts={posts} />
      <Enquire />
      <Footer />
    </>
  );
}
