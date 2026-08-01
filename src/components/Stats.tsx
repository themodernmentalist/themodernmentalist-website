import styles from "./Stats.module.css";

const stats = [
  { num: "10+", label: "Years Performing" },
  { num: "25+", label: "Countries" },
  { num: "4", label: "Yeses on BGT" },
];

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.thesis}>
        Ten years. Twenty-five countries. One question every audience asks:
        how did he know that?
      </div>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.item}>
          <div className={styles.num}>{stat.num}</div>
          <div className={`eyebrow ${styles.label}`}>{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
