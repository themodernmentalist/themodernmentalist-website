import { Underline, HandNote } from "./Annotate";
import EnquiryForm from "./EnquiryForm";
import styles from "./Enquire.module.css";

export default function Enquire({ variant }: { variant?: "christmas" }) {
  if (variant === "christmas") {
    return (
      <section id="enquire" className={`${styles.enquire} ${styles.enquireXmas}`}>
        <span className={`eyebrow ${styles.xmasEyebrow}`}>The Invitation</span>
        <h2 className={styles.xmasTitle}>Tell me about your Christmas party.</h2>
        <p className={styles.xmasIntro}>
          I&rsquo;ll reply personally with availability and a suggestion for
          the evening.
        </p>
        <EnquiryForm variant="christmas" />
      </section>
    );
  }

  return (
    <section id="enquire" className={styles.enquire}>
      <h2 className={styles.title}>The Invitation.</h2>
      <p className={styles.subtitle}>
        <Underline color="var(--poster-yellow)">
          Let&apos;s create something unforgettable.
        </Underline>
      </p>
      <p className={styles.intro}>
        Tell Edwin a little about your event and he&apos;ll be in touch
        personally.{" "}
        <HandNote className={styles.introNote} color="var(--poster-yellow)">
          I can&apos;t wait :)
        </HandNote>
      </p>
      <EnquiryForm />
    </section>
  );
}
