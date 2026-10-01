import Image from "next/image";
import { HandNote, CurvedArrow } from "../Annotate";
import styles from "./Testimonials.module.css";

const featuredQuoteText =
  "Edwin was the absolute standout at our Gala, both close up and on stage he had the entire room hooked from start to finish";

const quotes = [
  {
    quote: featuredQuoteText,
    name: "CRY UK",
    role: "Charity Gala",
    mobileOnly: true,
  },
  {
    quote:
      "Incredible! Mind fully blown but also so impressed at the warmth and caring way Edwin looked after guests and hosted our event. He's pure magic.",
    name: "Sahara Foundation",
    role: "Charity Event",
  },
  {
    quote:
      "Ed exceeded all expectations at our Christmas party. His magic and mentalism were incredibly impressive, and he engaged effortlessly with the whole team. Professional, personable, and a real highlight of the event.",
    name: "Bregal Milestone",
    role: "Christmas Party",
  },
  {
    quote:
      "With nearly 200 attendees, Edwin intuitively read a reserved crowd, bringing in helpers and impressing everyone with his stage act, then stayed all afternoon entertaining guests. He made our Christmas party.",
    name: "Sky",
    role: "Christmas Party",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.featured}>
        <div className={styles.photo}>
          <Image
            src="/images/corporate-cry.jpg"
            alt="Edwin sharing a moment with a guest at a corporate event"
            fill
            className={styles.image}
            sizes="(max-width: 820px) 100vw, 50vw"
          />
          <div className={styles.reactionNote}>
            <HandNote className={styles.reactionText} color="var(--poster-yellow)">
              We want your guests
              <br />
              looking like this!
            </HandNote>
            <CurvedArrow className={styles.reactionArrow} />
          </div>
        </div>
        <div className={styles.featuredText}>
          <span className={`eyebrow ${styles.eyebrow}`}>Client Testimonial</span>
          <p className={styles.featuredQuote}>
            &ldquo;{featuredQuoteText}&rdquo;
          </p>
          <cite>CRY UK, Charity Gala</cite>
        </div>
      </div>

      <span className={`eyebrow ${styles.wordsEyebrow}`}>In Their Words</span>
      <div className={styles.grid}>
        {quotes.map((item) => (
          <div
            className={`${styles.item} ${item.mobileOnly ? styles.mobileOnly : ""}`}
            key={item.name}
          >
            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            <p className={styles.name}>{item.name}</p>
            <p className={`eyebrow ${styles.role}`}>{item.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
