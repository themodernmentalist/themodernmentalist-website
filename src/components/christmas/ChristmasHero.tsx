import Image from "next/image";
import styles from "./ChristmasHero.module.css";

export default function ChristmasHero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/corporate-hero.jpg"
        alt="Edwin Todd performing mentalism at a corporate Christmas party"
        fill
        priority
        className={`${styles.image} ${styles.desktopImage}`}
        sizes="(max-width: 820px) 0px, 100vw"
        quality={90}
      />
      <Image
        src="/images/hero-stage.jpg"
        alt="Edwin Todd performing mentalism at a corporate Christmas party"
        fill
        priority
        className={`${styles.image} ${styles.mobileImage}`}
        sizes="(max-width: 820px) 200vw, 0px"
        quality={90}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={`eyebrow ${styles.badge}`}>December Dates Filling Fast</p>
        <h1>The Christmas party everyone still talks about in January...</h1>
        <p className={styles.sub}>
          <strong>The Modern Mentalist:</strong>{" "}
          Entertainment that creates connection &amp; turns colleagues into
          friends.
        </p>
        <a className={styles.cta} href="#enquire">
          Check Your Date →
        </a>
      </div>
    </section>
  );
}
