import styles from "./Showreel.module.css";

export default function Showreel() {
  return (
    <section className={styles.showreel}>
      <span className={`eyebrow ${styles.eyebrow}`}>See Him In Action</span>
      <h2>The showreel.</h2>
      <div className={styles.frame}>
        <iframe
          src="https://player.vimeo.com/video/1154587554?title=0&byline=0&portrait=0"
          title="Edwin Todd showreel"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={styles.video}
        />
      </div>
    </section>
  );
}
