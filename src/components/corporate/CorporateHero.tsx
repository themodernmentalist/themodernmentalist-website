import Image from "next/image";
import styles from "./CorporateHero.module.css";

export default function CorporateHero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/corporate-hero.jpg"
        alt="Edwin Todd performing on a corporate stage"
        fill
        priority
        className={styles.image}
        sizes="(max-width: 820px) 200vw, 100vw"
        quality={90}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Corporate Events · London &amp; Worldwide
        </p>
        <h1>
          The moment your guests
          <br />
          stop checking their phones.
        </h1>
        <p className={styles.sub}>
          Shaped around the room it&apos;s built for, from conferences to
          summer socials and product launches, an event your attendees
          won&apos;t stop talking about.
        </p>
        <a className={styles.cta} href="#enquire">
          Enquire →
        </a>
      </div>
    </section>
  );
}
