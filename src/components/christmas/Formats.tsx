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
    description: "The unforgettable moment they'll still be talking about next Christmas.",
    noteAfterTitle: "this can be bespoke to your company",
  },
  {
    num: "03 - HOSTING",
    title: "Host/Emcee",
    description: "Energy and flow for the whole evening, not just a slot in it.",
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
              <HandNote className={styles.noteAfterTitle} color="var(--poster-yellow)">
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
