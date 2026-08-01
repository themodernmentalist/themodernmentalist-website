import Image from "next/image";
import Link from "next/link";
import styles from "./Settings.module.css";

const cards = [
  {
    num: "01 — CORPORATE",
    title: "Company Events",
    description:
      "Close-up, stage, or hosting — bespoke experiences designed to engage the room and elevate the evening.",
    image: "/images/card-corporate.jpg",
    href: "/corporate",
  },
  {
    num: "02 — PRIVATE",
    title: "Private Gatherings",
    description:
      "Intimate, tailored moments for private celebrations and luxury dinners that guests won't forget.",
    image: "/images/card-private.jpg",
    href: "/private-events",
  },
  {
    num: "03 — WEDDINGS",
    title: "Weddings",
    description:
      "Atmosphere enhanced, never overtaken — entertainment that fits seamlessly into your day.",
    image: "/images/card-weddings.jpg",
    href: "/weddings",
  },
];

export default function Settings() {
  return (
    <section className={styles.settings}>
      <span className={`eyebrow ${styles.eyebrow}`}>Choose your setting</span>
      <h2>Every experience is shaped by the room it&apos;s built for.</h2>
      <div className={styles.grid}>
        {cards.map((card) => (
          <Link href={card.href} key={card.num} className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                className={styles.image}
                sizes="(max-width: 820px) 100vw, 33vw"
              />
            </div>
            <div className={styles.cardBody}>
              <span className={`${styles.num}`}>{card.num}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
