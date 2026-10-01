import Script from "next/script";
import { Underline, HandNote } from "./Annotate";
import styles from "./Enquire.module.css";

export default function Enquire() {
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
      <div className={styles.frameWrap}>
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
      </div>
      <Script
        src="https://maverickmagicians.17hats.com/vendor/iframeSizer.min.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
