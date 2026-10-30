import StampIn from "../StampIn";
import { HandNote } from "../Annotate";
import styles from "./Formats.module.css";

const formats = [
  {
    num: "01 - DRINKS RECEPTION",
    title: "Close-Up Experience",
    description: "The perfect icebreaker for a room that hasn't warmed up yet.",
    noteAfterTitle: "up close & personal",
  },
  {
    num: "02 - THE HIGHLIGHT",
    title: "The Stage Set",
    description: "An unforgettable moment for the whole room, from a 10-minute showstopper to a full 45-minute set.",
    noteAfterTitle: "this can be bespoke to your company",
  },
  {
    num: "03 - HOSTING",
    title: "Host/Emcee",
    description:
      "I keep the evening flowing and weave mind reading into the moments between.",
    noteAfterTitle: "I promise to do more than just announce dinner",
  },
];

export default function Formats() {
  return (
    <section className={styles.formats}>
      <span className={`eyebrow ${styles.eyebrow}`}>How It Works</span>
      <h2>Edwin builds his performance around your evening...</h2>
      <div className={styles.grid}>
        {formats.map((format, i) => (
          <StampIn key={format.num} delay={i * 120} className={styles.card}>
            <span className={styles.num}>{format.num}</span>
            <h3>{format.title}</h3>
            {format.noteAfterTitle && (
              <HandNote
                className={`${styles.noteAfterTitle} ${format.title === "Host/Emcee" ? "" : styles.noteDesktopOnly}`}
                color="var(--poster-yellow)"
              >
                {format.noteAfterTitle}
              </HandNote>
            )}
            <p>{format.description}</p>
          </StampIn>
        ))}
      </div>
      <a className={styles.cta} href="#enquire">
        Enquire →
      </a>
    </section>
  );
}
