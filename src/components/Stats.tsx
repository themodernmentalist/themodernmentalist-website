import StampIn from "./StampIn";
import { Circle } from "./Annotate";
import styles from "./Stats.module.css";

const stats = [
  { num: "10+", label: "Years Performing" },
  { num: "30+", label: "Countries" },
  { num: "4", label: "Yeses on BGT", mobileLabel: "BGT Yeses", circled: true },
];

export default function Stats({
  hideThesisOnMobile = false,
  mobileStacked = false,
}: {
  hideThesisOnMobile?: boolean;
  mobileStacked?: boolean;
}) {
  return (
    <section
      className={`${styles.stats} ${mobileStacked ? styles.mobileStacked : ""}`}
    >
      <div
        className={`${styles.thesis} ${hideThesisOnMobile ? styles.thesisMobileHidden : ""}`}
      >
        Thousands of unforgettable moments...
      </div>
      {stats.map((stat, i) => (
        <StampIn key={stat.label} delay={i * 120} className={styles.item}>
          <div className={styles.num}>
            {stat.circled ? (
              <Circle color="var(--poster-gold-ink)">{stat.num}</Circle>
            ) : (
              stat.num
            )}
          </div>
          <div className={`eyebrow ${styles.label}`}>
            <span className={styles.labelDesktop}>{stat.label}</span>
            {stat.mobileLabel && (
              <span className={styles.labelMobile}>{stat.mobileLabel}</span>
            )}
          </div>
        </StampIn>
      ))}
    </section>
  );
}
