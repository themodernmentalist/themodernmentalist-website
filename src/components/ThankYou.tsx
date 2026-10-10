import { HandNote } from "./Annotate";
import Credits from "./Credits";
import styles from "./ThankYou.module.css";

export default function ThankYou() {
  return (
    <div className={styles.thanks}>
      <p className={styles.eyebrow}>Enquiry received</p>
      <h2 className={styles.title}>Thank you.</h2>
      <HandNote className={styles.note} color="var(--poster-yellow)">
        I already knew you’d write ;)
      </HandNote>
      <p className={styles.sub}>
        Edwin will be in touch personally, very soon.
      </p>
      <Credits />
    </div>
  );
}
