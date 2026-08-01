import Image from "next/image";
import styles from "./Testimonials.module.css";

const quotes = [
  {
    quote:
      "Edwin, just want to say a huge thanks for the other day at the EY London Audit Summer Social! Every person who attended has provided amazing feedback, and you left everyone spellbound!",
    name: "EY",
    role: "London Audit Summer Social",
  },
  {
    quote:
      "Ed exceeded all expectations at our Christmas party. His magic and mentalism were incredibly impressive, and he engaged effortlessly with the whole team. Professional, personable, and a real highlight of the event.",
    name: "Bregal Milestone",
    role: "Christmas Party",
  },
  {
    quote:
      "With nearly 200 attendees, Edwin read a famously reserved crowd intuitively, bringing in helpers as needed and impressing everyone with his 45-minute stage act. He then stayed on all afternoon, entertaining individuals and tables.",
    name: "Sky",
    role: "Christmas Lunch Party",
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
