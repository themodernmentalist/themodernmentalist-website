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
          The moment your conference
          <br />
          stops checking their phones.
        </h1>
        <p className={styles.sub}>
          Close-up mentalism at the drinks reception. A stage set built for
          keynote-calibre rooms. Or Edwin hosting the whole evening, start to
          finish.
        </p>
        <a className={styles.cta} href="#enquire">
          Enquire →
        </a>
      </div>
    </section>
  );
}
