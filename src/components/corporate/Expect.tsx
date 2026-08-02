import styles from "./Expect.module.css";

export default function Expect() {
  return (
    <section className={styles.expect}>
      <span className={`eyebrow ${styles.eyebrow}`}>
        Not Sure What To Expect?
      </span>
      <h2>This video is for you.</h2>
      <div className={styles.frame}>
        <iframe
          src="https://player.vimeo.com/video/1214857367?title=0&byline=0&portrait=0"
          title="What To Expect When You Book Edwin"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={styles.video}
        />
      </div>
      <a className={styles.cta} href="#enquire">
        Enquire →
      </a>
    </section>
  );
}
