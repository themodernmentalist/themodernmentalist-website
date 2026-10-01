import Image from "next/image";
import { HandNote, LoopyArrow, ScratchUnderline } from "../Annotate";
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
      <div className={styles.aboutThemNote}>
        <LoopyArrow className={styles.aboutThemArrow} />
        <HandNote color="var(--poster-yellow)">it&apos;s about them</HandNote>
      </div>
      <div className={styles.eventNotes}>
        <HandNote color="var(--poster-yellow)">
          product launches
          <br />
          summer socials
          <br />
          conference energisers
          <br />
          you get the idea :)
        </HandNote>
      </div>
      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Corporate Events · London &amp; Worldwide
        </p>
        <h1>
          The moment your guests
          <br />
          <ScratchUnderline color="var(--poster-yellow)" className={styles.stopUnderline}>stop</ScratchUnderline> checking their phones.
        </h1>
        <p className={styles.sub}>
          Close up, stage or hosting- an event your attendees won&apos;t
          stop talking about.
        </p>
        <div className={styles.ctaRow}>
          <a className={styles.cta} href="#enquire">
            Enquire →
          </a>
        </div>
      </div>
    </section>
  );
}
