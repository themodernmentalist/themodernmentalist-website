import Script from "next/script";
import styles from "./Enquire.module.css";

export default function Enquire() {
  return (
    <section id="enquire" className={styles.enquire}>
      <span className={`eyebrow ${styles.eyebrow}`}>Enquire</span>
      <h2>Let&apos;s talk about your event.</h2>
      <p className={styles.intro}>
        Tell us the date, the room, and the occasion. Edwin replies to every
        enquiry personally.
      </p>
      <div className={styles.frame}>
        <iframe
          name="lc_contact_form"
          frameBorder={0}
          width="100%"
          height="600"
          src="https://maverickmagicians.17hats.com/p#/embed/pkzkfvbvdnrfrzrcffshktcbcknxxvfw"
          className={styles.iframe}
        />
      </div>
      <Script
        src="https://maverickmagicians.17hats.com/vendor/iframeSizer.min.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
