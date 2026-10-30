import Image from "next/image";
import { Underline } from "../Annotate";
import styles from "./ChristmasHero.module.css";

export default function ChristmasHero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/christmas-hero-desktop.jpg"
        alt="Edwin Todd performing mentalism at a corporate Christmas party"
        fill
        priority
        className={`${styles.image} ${styles.desktopImage}`}
        sizes="(max-width: 820px) 0px, 100vw"
        quality={90}
      />
      <Image
        src="/images/christmas-hero-mobile.jpg"
        alt="Edwin Todd performing mentalism at a corporate Christmas party"
        fill
        priority
        className={`${styles.image} ${styles.mobileImage}`}
        sizes="(max-width: 820px) 200vw, 0px"
        quality={90}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>
          <span className={styles.desktopTitle}>
            The Christmas party they&rsquo;re{" "}
            <Underline>still talking about</Underline> in January
          </span>
          <span className={styles.mobileTitle}>
            Give them a Christmas&nbsp;party{" "}
            <Underline>worth talking about.</Underline>
          </span>
        </h1>
        <p className={styles.sub}>
          Mind reading and magic that break the ice, get colleagues laughing
          and make the whole room part of the show.
        </p>
        <div className={styles.ctaRow}>
          <a className={styles.cta} href="#enquire">
            Check Availability →
          </a>
          <p className={styles.ctaHelper}>
            Tell me your date and venue. I&rsquo;ll reply personally.
          </p>
        </div>
      </div>
    </section>
  );
}
