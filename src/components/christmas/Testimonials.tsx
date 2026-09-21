import Image from "next/image";
import styles from "./Testimonials.module.css";

const quotes = [
  {
    quote:
      "Ed exceeded all expectations at our Christmas party. Professional, personable, and a real highlight of the event.",
    name: "Bregal Milestone",
  },
  {
    quote:
      "With nearly 200 attendees, Edwin intuitively read a reserved crowd, bringing in helpers and impressing everyone with his stage act, then stayed all afternoon entertaining guests. He made our Christmas party.",
    name: "Sky Mobile Christmas Party 2025",
    mobileOnly: true,
  },
  {
    quote:
      "Edwin was amazing! We had him perform at a client event and we were all so blown away. Completely different to any magician I've seen before with a unique and engaging performance. Could not recommend him enough!!!!",
    name: "Oxford Global",
    mobileHidden: true,
  },
  {
    quote:
      "Incredible! Mind fully blown but also so impressed at the warmth and caring way Edwin looked after guests and hosted our event. He's pure magic.",
    name: "Sahara Foundation",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.featured}>
        <div className={styles.photo}>
          <Image
            src="/images/christmas-testimonial.jpg"
            alt="Guests reacting to Edwin's mentalism at a corporate Christmas party"
            fill
            className={styles.image}
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
        <div className={styles.featuredText}>
          <span className={`eyebrow ${styles.eyebrow}`}>Christmas Party Testimonial</span>
          <blockquote>
            &ldquo;With nearly 200 attendees, Edwin intuitively read a
            reserved crowd, bringing in helpers and impressing everyone
            with his stage act, then stayed all afternoon entertaining
            guests. He made our Christmas party.&rdquo;
          </blockquote>
          <cite>Sky Mobile Christmas Party 2025</cite>
        </div>
      </div>

      <span className={`eyebrow ${styles.wordsEyebrow}`}>In Their Words</span>
      <div className={styles.grid}>
        {quotes.map((item) => (
          <div
            className={[
              styles.item,
              item.mobileOnly ? styles.mobileOnly : "",
              item.mobileHidden ? styles.mobileHidden : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={item.name}
          >
            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            <p className={styles.name}>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
