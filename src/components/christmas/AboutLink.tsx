import Link from "next/link";
import styles from "./AboutLink.module.css";

export default function AboutLink() {
  return (
    <section className={styles.section}>
      <Link href="/about" className={styles.link}>
        Learn More About Edwin →
      </Link>
    </section>
  );
}
