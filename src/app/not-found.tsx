import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { HandNote } from "@/components/Annotate";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Wrong room | The Modern Mentalist",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className={styles.page}>
        <p className={styles.code}>Error 404</p>
        <h1 className={styles.title}>Wrong room.</h1>
        <HandNote className={styles.note} color="var(--poster-yellow)">
          I predicted this. I just didn’t say anything.
        </HandNote>
        <p className={styles.sub}>
          The page you’re after has moved, never existed, or is hiding in a hat.
        </p>
        <Link href="/" className={styles.cta}>
          Back to the front door →
        </Link>
      </main>
    </>
  );
}
