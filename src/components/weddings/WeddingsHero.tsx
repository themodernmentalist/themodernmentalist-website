import Image from "next/image";
import styles from "./WeddingsHero.module.css";

export default function WeddingsHero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/wedding-hero.jpg"
        alt="Edwin performing close-up mentalism for a bride and her guests"
        fill
        priority
        className={`${styles.image} ${styles.desktopOnly}`}
        sizes="(max-width: 820px) 200vw, 100vw"
        quality={90}
      />
      <Image
        src="/images/wedding-hero-mobile.jpg"
        alt="Edwin performing close-up mentalism for a bride and her guests"
        fill
        priority
        className={`${styles.image} ${styles.mobileOnly}`}
        sizes="(max-width: 820px) 200vw, 100vw"
        quality={90}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Weddings · London, UK &amp; Destination
        </p>
        <h1>
          Moments
          <br />
          your guests
          <br />
          will never forget.
        </h1>
        <p className={styles.sub}>
          From close-up magic to hosting your day, Edwin brings his craft
          to high-end weddings across London, the UK, and a select number
          of destination weddings each year, woven in for moments of
          laughter, connection and quiet amazement.
        </p>
        <a className={styles.cta} href="#enquire">
          Enquire →
        </a>
      </div>
    </section>
  );
}
