import Image from "next/image";
import styles from "./Testimonials.module.css";

const smaller = [
  {
    quote:
      "We booked Ed for our Christmas party and he exceeded all expectations. His magic and mentalism were incredibly impressive, and he engaged effortlessly with a mixed group, keeping everyone entertained throughout. The feedback from the team was overwhelmingly positive. He was professional, personable, and a real highlight of the event. Highly recommended.",
    name: "Bregal Milestone",
  },
  {
    quote:
      "Edwin attended our Christmas lunch party with nearly 200 attendees. He was very friendly and amazing from start to finish. He managed to read very intuitively, what is a very reserved crowd, managing to bring in helpers from the audience as needed and really impressed everyone with his 45 min stage act. He then continued to stay on for the duration of the afternoon, walking around the room entertaining individuals and tables. Thank you Edwin, you definitely made our Christmas party!",
    name: "Sky",
  },
  {
    quote: "Left everyone spellbound!",
    name: "EY",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.featured}>
        <div className={styles.photo}>
          <Image
            src="/images/corporate-cry.jpg"
            alt="Edwin performing close-up mentalism at the CRY UK charity gala"
            fill
            className={styles.image}
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
        <div className={styles.featuredText}>
          <span className={`eyebrow ${styles.eyebrow}`}>Client Testimonial</span>
          <blockquote>
            &ldquo;Edwin was an absolute standout at our charity gala and
            exceeded every expectation. He performed close-up mentalism
            during our drinks reception, where he had guests completely
            captivated. Later, his stage performance was equally impressive,
            engaging, interactive, and genuinely mind-blowing. He had the
            entire room hooked from start to finish. I wouldn&apos;t hesitate
            to recommend Edwin for any corporate event.&rdquo;
          </blockquote>
          <cite>CRY UK, Charity Gala</cite>
        </div>
      </div>
      <div className={styles.grid}>
        {smaller.map((item) => (
          <div className={styles.card} key={item.name}>
            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            <p className={styles.name}>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
