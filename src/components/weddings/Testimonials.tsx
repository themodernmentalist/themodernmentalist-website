import Image from "next/image";
import styles from "./Testimonials.module.css";

const quotes = [
  {
    quote:
      "Wow, what an addition to our wedding - Edwin blew us and our guests away.",
    name: "Hunter & Riley",
    role: "Destination Wedding",
  },
  {
    quote:
      "Initially I wasn't sure about having a magician but I'm so glad we booked Edwin. He made the event magical. We would definitely book him again.",
    name: "Jaspreet & Pranesha",
    role: "Wedding",
  },
  {
    quote:
      "Just want to send a huge thank you to you for blowing the mind of every guest at our wedding, including us!! Incredible!!",
    name: "Jennifer & Sophie",
    role: "Wedding",
  },
  {
    quote:
      "Edwin was phenomenal from start to finish, he made our guests feel at ease and we are so happy our planner recommended him.",
    name: "Hanan & Samantha",
    role: "Destination Wedding",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.featured}>
        <div className={styles.photo}>
          <Image
            src="/images/wedding-testimonial.jpg"
            alt="A bride reacting with delight during a close-up mentalism moment with Edwin"
            fill
            className={styles.image}
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
        <div className={styles.featuredText}>
          <span className={`eyebrow ${styles.eyebrow}`}>Client Testimonial</span>
          <blockquote>
            &ldquo;Edwin was just incredible, he was punctual, he worked the
            whole room and made our wedding reception so much fun. He had
            everyone in complete awe of his abilities, we couldn&apos;t
            recommend him enough!&rdquo;
          </blockquote>
          <cite>James &amp; Rachel, Wedding</cite>
        </div>
      </div>

      <span className={`eyebrow ${styles.wordsEyebrow}`}>In Their Words</span>
      <div className={styles.grid}>
        {quotes.map((item) => (
          <div className={styles.item} key={item.name}>
            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            <p className={styles.name}>{item.name}</p>
            <p className={`eyebrow ${styles.role}`}>{item.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
