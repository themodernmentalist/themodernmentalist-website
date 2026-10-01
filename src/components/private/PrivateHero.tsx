import Image from "next/image";
import { ScratchUnderline, HandNote, CurvedArrow } from "../Annotate";
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
      <div className={styles.rememberNote}>
        <CurvedArrow className={styles.rememberArrow} />
        <HandNote color="var(--poster-yellow)">
          this is the bit
          <br />
          they remember
        </HandNote>
      </div>
      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Private Events · London &amp; Worldwide
        </p>
        <h1>
          An experience <ScratchUnderline color="var(--poster-yellow)" className={styles.experienceUnderline}>beyond</ScratchUnderline> entertainment.
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
