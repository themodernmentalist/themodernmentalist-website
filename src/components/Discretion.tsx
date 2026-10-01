import { HandNote, ClassifiedStamp } from "./Annotate";
import styles from "./Discretion.module.css";

const redactedQuotes = [
  {
    quote: "The best act we have had at our yearly soirée in years.",
  },
  {
    quote: "Absolutely phenomenal. I can't wait to book Edwin again.",
  },
  {
    quote:
      "Edwin surpasses all expectations. We have no idea how he does what he does, and we now use him for all of our events.",
  },
];

export default function Discretion() {
  return (
    <section className={styles.discretion}>
      <span className={`eyebrow ${styles.eyebrow}`}>In Confidence</span>
      <h2>
        A lot of the rooms he&apos;s worked in, we can&apos;t share the
        details of.
      </h2>
      <div className={styles.introRow}>
        <HandNote className={styles.sideNote} color="var(--poster-yellow)">
          Some of my UHNW clients prefer their names stay out
          of it- here&apos;s what they said anyways
        </HandNote>
      </div>
      <div className={styles.gridWrap}>
        <ClassifiedStamp
          className={styles.stamp}
          rotate={-16}
          fontSize="clamp(40px, 6.2vw, 72px)"
        />
        <div className={styles.grid}>
          {redactedQuotes.map((item, i) => (
            <div className={styles.card} key={i}>
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
