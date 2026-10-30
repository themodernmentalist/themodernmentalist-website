import { Circle } from "../Annotate";
import styles from "./SkyQuote.module.css";

export default function SkyQuote() {
  return (
    <section className={styles.band}>
      <blockquote className={styles.quote}>
        &ldquo;Edwin{" "}
        <span className={styles.made}>
          <Circle delay={0.3}>made</Circle>
        </span>{" "}
        our Christmas party.&rdquo;
      </blockquote>
      <cite className={styles.cite}>Sky Mobile</cite>
    </section>
  );
}
