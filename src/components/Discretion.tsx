import styles from "./Discretion.module.css";

const redactedQuotes = [
  {
    quote: "[ PLACEHOLDER — paste redacted quote here ]",
    attribution: "████████████, ████████████",
  },
  {
    quote: "[ PLACEHOLDER — paste redacted quote here ]",
    attribution: "████████████, ████████████",
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
      <p className={styles.intro}>
        Some clients — family offices, principals, private events — prefer
        their names stay out of it. Here&apos;s what they said anyway.
      </p>
      <div className={styles.grid}>
        {redactedQuotes.map((item, i) => (
          <div className={styles.card} key={i}>
            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            <p className={styles.attribution}>{item.attribution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
