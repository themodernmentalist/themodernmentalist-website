import Image from "next/image";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.featured}>
        <div className={styles.photo}>
          <Image
            src="/images/private-testimonial.jpg"
            alt="Edwin performing for guests at a private event"
            fill
            className={styles.image}
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
        <div className={styles.featuredText}>
          <span className={`eyebrow ${styles.eyebrow}`}>Client Testimonial</span>
          <blockquote>
            &ldquo;Absolutely amazing and left all guests leaving
            mind-blown! His performance and energy completely captivated
            the room. People were still talking about him the next day,
            which says everything. If you&apos;re considering booking
            Edwin for an event, I couldn&apos;t recommend him more
            highly.&rdquo;
          </blockquote>
          <cite>Oxford University Alumni Event</cite>
        </div>
      </div>
    </section>
  );
}
