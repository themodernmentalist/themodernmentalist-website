import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero-stage.jpg"
        alt="Edwin Todd performing on stage"
        fill
        priority
        className={styles.heroImage}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={`${styles.eyebrow} eyebrow`}>
          The Modern Mentalist · London &amp; Worldwide
        </p>
        <h1>
          <span className={styles.typeReveal}>
            You&apos;re thinking about your next event.
          </span>
          Entertainment that
          <br />
          creates connection.
        </h1>
        <div className={styles.sub}>
          <p>
            Your guests won&apos;t just remember Edwin. They&apos;ll
            remember each other.
          </p>
          <a className={styles.cta} href="/enquire">
            Enquire →
          </a>
        </div>
      </div>
    </section>
  );
}
