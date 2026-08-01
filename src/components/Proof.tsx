import Image from "next/image";
import styles from "./Proof.module.css";

export default function Proof() {
  return (
    <section className={styles.proof}>
      <div className={styles.photo}>
        <Image
          src="/images/proof-reaction.jpg"
          alt="A guest reacting to Edwin's performance"
          fill
          className={styles.image}
          sizes="(max-width: 820px) 100vw, 50vw"
        />
      </div>
      <div className={styles.text}>
        <span className={`eyebrow ${styles.eyebrow}`}>Client Testimonial</span>
        <blockquote>
          &ldquo;Edwin is incredibly talented — he was the star of our recent
          party.&rdquo;
        </blockquote>
        <cite>L&apos;Oréal Paris</cite>
      </div>
    </section>
  );
}
