import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Nav from "@/components/Nav";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";
import { client } from "../../../../sanity/lib/client";
import { POST_QUERY, POST_SLUGS_QUERY } from "../../../../sanity/lib/queries";
import { urlForImage } from "../../../../sanity/lib/image";
import styles from "./post.module.css";

export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  corporate: "Corporate",
  weddings: "Weddings",
  private: "Private Events",
  general: "General",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
};

export async function generateStaticParams() {
  const slugs = await client.fetch(POST_SLUGS_QUERY);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });
  if (!post) return {};

  return {
    title: `${post.title} | The Modern Mentalist`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug.current}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) notFound();

  const jsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq: { question: string; answer: string }) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Nav />
      <article className={styles.post}>
        <header className={styles.header}>
          {post.category && (
            <span className={`eyebrow ${styles.category}`}>
              {categoryLabels[post.category] ?? post.category}
            </span>
          )}
          <h1>{post.title}</h1>
          <span className={styles.date}>{formatDate(post.publishedAt)}</span>
        </header>

        {post.mainImage && (
          <div className={styles.imageWrap}>
            <Image
              src={urlForImage(post.mainImage).width(1400).height(800).url()}
              alt={post.title}
              fill
              className={styles.image}
              sizes="(max-width: 820px) 100vw, 900px"
              priority
            />
          </div>
        )}

        <div className={styles.body}>
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        {post.faqs?.length > 0 && (
          <div className={styles.faqs}>
            <span className="eyebrow">FAQs</span>
            <h2>Questions worth asking.</h2>
            {post.faqs.map((faq: { _key: string; question: string; answer: string }) => (
              <div className={styles.faqItem} key={faq._key}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        <a className={styles.backLink} href="/blog">
          ← Back to the blog
        </a>
      </article>
      <Enquire />
      <Footer />
    </>
  );
}
