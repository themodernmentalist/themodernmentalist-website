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
        sizes="(max-width: 820px) 200vw, 100vw"
        quality={90}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={`${styles.eyebrow} eyebrow`}>
          The Modern Mentalist ·{" "}
          <span className={styles.nowrap}>London &amp; Worldwide</span>
        </p>
        <h1>
          <span className={styles.typeReveal}>
            You&apos;re thinking about your next event...
          </span>
          Entertainment
          <br className={styles.breakMobile} />
          {" "}that
          <br className={styles.breakDesktop} />
          {" "}creates
          <br className={styles.breakMobile} />
          {" "}connection.
        </h1>
        <div className={styles.sub}>
          <p>
            Your guests won&apos;t just remember Edwin. They&apos;ll
            remember each other.
          </p>
          <a className={styles.cta} href="#enquire">
            Enquire →
          </a>
        </div>
      </div>
    </section>
  );
}
