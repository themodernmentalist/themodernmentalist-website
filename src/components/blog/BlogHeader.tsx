import styles from "./BlogHeader.module.css";

export default function BlogHeader() {
  return (
    <section className={styles.header}>
      <span className={`eyebrow ${styles.eyebrow}`}>The Insider</span>
      <h1>London&apos;s Modern Mentalism Blog</h1>
      <p>
        Thoughts on mentalism, event entertainment, and what it takes to make
        a room feel unforgettable.
      </p>
    </section>
  );
}
