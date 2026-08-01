import styles from "./Expect.module.css";

export default function Expect() {
  return (
    <section className={styles.expect}>
      <div className={styles.text}>
        <span className={`eyebrow ${styles.eyebrow}`}>What To Expect</span>
        <h2>Booking Edwin is the easy part.</h2>
        <p>
          From your first enquiry to the final bow, every detail is handled
          personally, so you can focus on the rest of the event. Here&apos;s
          the two-minute rundown of exactly what working with Edwin looks
          like.
        </p>
        <a className={styles.cta} href="#enquire">
          Enquire →
        </a>
      </div>
      <div className={styles.frame}>
        <iframe
          src="https://player.vimeo.com/video/1214857367?title=0&byline=0&portrait=0"
          title="What To Expect When You Book Edwin"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={styles.video}
        />
      </div>
    </section>
  );
}
