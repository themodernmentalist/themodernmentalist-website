import Image from "next/image";
import styles from "./PrivateHero.module.css";

export default function PrivateHero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/private-hero.jpg"
        alt="Edwin performing close-up mentalism at a private gathering"
        fill
        priority
        className={styles.image}
        sizes="(max-width: 820px) 200vw, 100vw"
        quality={90}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Private Events · London &amp; Worldwide
        </p>
        <h1>
          An experience,
          <br />
          not entertainment.
        </h1>
        <p className={styles.sub}>
          Edwin works with a limited number of private events each year,
          creating experiences that feel intimate, engaging, and entirely
          tailored to the room.
        </p>
        <a className={styles.cta} href="#enquire">
          Enquire →
        </a>
      </div>
    </section>
  );
}
