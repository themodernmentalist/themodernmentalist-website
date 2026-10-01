import Image from "next/image";
import { Underline, HandNote, MarkerWrite, CurvedArrow } from "./Annotate";
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
        <div className={styles.mindReaderWrap}>
          <HandNote color="var(--poster-yellow)">mind reader</HandNote>
          <CurvedArrow className={styles.mindReaderArrow} />
        </div>
        <h1 className={styles.wordmark}>Edwin</h1>
        <div className={styles.subtitleRow}>
          <p className={styles.subtitle}>
            <Underline>The Modern Mentalist</Underline>
          </p>
          <p className={styles.tagline}>
            <MarkerWrite
              text={"Entertainment that\ncreates connection."}
              color="var(--poster-yellow)"
            />
          </p>
        </div>
        <div className={styles.sub}>
          <p>
            Your guests won&apos;t just remember Edwin. They&apos;ll
            remember each other.
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.cta} href="#enquire">
              Enquire →
            </a>
            <HandNote color="var(--poster-yellow)">trust me ;)</HandNote>
          </div>
        </div>
      </div>
    </section>
  );
}
