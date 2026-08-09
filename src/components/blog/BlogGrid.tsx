import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import styles from "./BlogGrid.module.css";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: unknown;
  category?: string;
  publishedAt: string;
};

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

export default function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug.current}`} key={post._id} className={styles.card}>
          <div className={styles.imageWrap}>
            {post.mainImage ? (
              <Image
                src={urlForImage(post.mainImage).width(800).height(533).url()}
                alt={post.title}
                fill
                className={styles.image}
                sizes="(max-width: 820px) 100vw, 33vw"
              />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
          <div className={styles.body}>
            {post.category && (
              <span className={styles.category}>{categoryLabels[post.category] ?? post.category}</span>
            )}
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className={styles.date}>{formatDate(post.publishedAt)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
