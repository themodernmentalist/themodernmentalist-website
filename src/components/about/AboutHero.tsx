import Image from "next/image";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.photo}>
        <Image
          src="/images/about-hero.jpg"
          alt="Edwin Todd, The Modern Mentalist"
          fill
          priority
          className={styles.image}
          sizes="(max-width: 820px) 100vw, 45vw"
          quality={90}
        />
        <div className={styles.overlay} />
        <div className={styles.heroText}>
          <p className={`eyebrow ${styles.eyebrow}`}>About Edwin</p>
          <h1>
            It&apos;s never been
            <br />
            about the magic.
          </h1>
        </div>
      </div>
      <div className={styles.content}>
        <p>
          Edwin&apos;s fascination with magic &amp; mentalism began at
          eleven, after watching a coin vanish in a school playground- a
          moment that sparked a lifelong interest in how people think,
          react, and connect. Today, he works with corporate and private
          clients to create experiences that feel personal, engaging, and
          genuinely unforgettable.
        </p>
        <p>
          As The Modern Mentalist, Edwin builds every set around the room
          he&apos;s walking into- bringing energy where it&apos;s needed
          and sparking the kind of conversation and shared reaction that
          guests won&apos;t stop talking about. It&apos;s never about the
          tricks. It&apos;s about the people- placing your guests at the
          centre of the experience, so they leave with something they
          can&apos;t quite put into words.
        </p>
        <p>
          For over a decade, he&apos;s performed at exclusive private
          events, luxury celebrations, and corporate gatherings across the
          globe. His style is modern, understated, and premium- think of
          him as the Soho House of entertainers: considered,
          experience-led, and built for those who value atmosphere as much
          as outcome.
        </p>
        <p>
          Clients often describe Edwin&apos;s magic ingredient as the
          ability to make every moment feel personal, turning a good event
          into something genuinely memorable.
        </p>
        <a className={styles.cta} href="#enquire">
          Enquire →
        </a>
      </div>
    </section>
  );
}
