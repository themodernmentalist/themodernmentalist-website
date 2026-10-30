import Image from "next/image";
import styles from "./Testimonials.module.css";

const quotes = [
  {
    quote:
      "Edwin was amazing! We had him perform at a client event and we were all so blown away. Completely different to any magician I've seen before with a unique and engaging performance. Could not recommend him enough!!!!",
    name: "Oxford Global",
    short:
      "Completely different to any magician I’ve seen before. Could not recommend him enough!",
  },
  {
    quote:
      "Incredible! Mind fully blown but also so impressed at the warmth and caring way Edwin looked after guests and hosted our event. He's pure magic.",
    name: "Sahara Foundation",
    short:
      "…so impressed at the warmth and caring way Edwin looked after guests and hosted our event. He’s pure magic.",
    mobileHidden: true,
  },
  {
    quote:
      "We hired Ed for our corporate party and to say people are still talking about it days after the event itself is an understatement. Ed amazed everyone with his mentalism and magic, everyone came away with a story to tell of how they were utterly baffled at what happened. We are already looking to rebook him for next years event!",
    name: "Strangford Management",
    short:
      "Ed amazed everyone with his mentalism and magic… We are already looking to rebook him for next years event!",
    mobileHidden: true,
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
            className={`${styles.item} ${"mobileHidden" in item ? styles.mobileHidden : ""}`}
            key={item.name}
          >
            <p className={styles.quote}>&ldquo;{item.short}&rdquo;</p>
            <p className={styles.name}>{item.name}</p>
            <details className={styles.more}>
              <summary>Read the full review</summary>
              <p>&ldquo;{item.quote}&rdquo;</p>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
}
