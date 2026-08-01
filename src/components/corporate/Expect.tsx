import styles from "./Expect.module.css";

export default function Expect() {
  return (
    <section className={styles.expect}>
      <div className={styles.text}>
        <p>
          Working with companies to transform their events, from
          conferences to summer socials and product launches, Edwin ensures
          your event stands out above the rest.
        </p>
        <p>
          Every set is built around the room he&apos;s walking into. Guests
          aren&apos;t just watching. They&apos;re involved, reacting, and
          leaving with something they can&apos;t quite explain.
        </p>
        <a className={styles.cta} href="#enquire">
          Enquire →
        </a>
      </div>
      <div className={styles.videoCol}>
        <span className={`eyebrow ${styles.eyebrow}`}>What To Expect</span>
        <div className={styles.frame}>
          <iframe
            src="https://player.vimeo.com/video/1214857367?title=0&byline=0&portrait=0"
            title="What To Expect When You Book Edwin"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className={styles.video}
          />
        </div>
      </div>
    </section>
  );
}
