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

const SITE_URL = "https://themodernmentalist.com";

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

  const url = `${SITE_URL}/blog/${post.slug.current}`;
  const ogImage = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${post.title} | The Modern Mentalist`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug.current}`,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "The Modern Mentalist",
      title: post.title,
      description: post.excerpt,
      locale: "en_GB",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: ["Edwin Todd"],
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : undefined,
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

  const url = `${SITE_URL}/blog/${post.slug.current}`;
  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  // Ranked list posts ("## 1. Name" headings) also get ItemList markup.
  const rankedItems: { position: number; name: string }[] = (post.body ?? [])
    .filter((b: { _type: string; style?: string }) => b._type === "block" && b.style === "h2")
    .map((b: { children?: { text: string }[] }) => (b.children ?? []).map((c) => c.text).join(""))
    .map((text: string) => text.match(/^(\d+)\.\s+(.+)$/))
    .filter((m: RegExpMatchArray | null): m is RegExpMatchArray => Boolean(m))
    .map((m: RegExpMatchArray) => ({ position: Number(m[1]), name: m[2].trim() }));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: post.title,
      description: post.excerpt,
      image: imageUrl ? [imageUrl] : undefined,
      datePublished: post.publishedAt,
      dateModified: post._updatedAt ?? post.publishedAt,
      inLanguage: "en-GB",
      articleSection: categoryLabels[post.category] ?? "General",
      author: {
        "@type": "Person",
        name: "Edwin Todd",
        url: `${SITE_URL}/about`,
      },
      publisher: {
        "@type": "Organization",
        name: "The Modern Mentalist",
        url: SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (rankedItems.length >= 3) {
    graph.push({
      "@type": "ItemList",
      name: post.title,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: rankedItems.length,
      itemListElement: rankedItems.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        name: item.name,
      })),
    });
  }

  if (post.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq: { question: string; answer: string }) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
