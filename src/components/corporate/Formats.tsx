import styles from "./Formats.module.css";

const formats = [
  {
    num: "01 - CLOSE-UP",
    title: "The Close-Up Experience",
    description:
      "World-class mentalism at a standing reception, at the table, or in a dedicated Magic Booth guests step into on their own terms, for a moment or the whole evening. Reactions build early, word spreads, and a quiet buzz takes over the room.",
    requirements: "A table and chairs, or a quiet seating area.",
  },
  {
    num: "02 - STAGE",
    title: "The Stage Experience",
    description:
      "A performance built around trust, attention and decision-making, customised to your company and built for keynote-calibre rooms. It's not a generic show, it's about your people and your business. The stage set creates the highlight that carries energy and conversation into the rest of the evening.",
    requirements: "A performance space with clear sight-lines.",
  },
  {
    num: "03 - HOSTING",
    title: "The Host",
    description:
      "Edwin holds the room as host, bringing clarity, energy and flow to the evening, while weaving in moments of magic and mentalism that elevate the atmosphere without ever disrupting it.",
    requirements: "Details confirmed upon request.",
  },
];

export default function Formats() {
  return (
    <section className={styles.formats}>
      <span className={`eyebrow ${styles.eyebrow}`}>Make Your Company Event Stand Out</span>
      <h2>Three ways to bring Edwin into the room.</h2>
      <div className={styles.grid}>
        {formats.map((format) => (
          <div className={styles.card} key={format.num}>
            <span className={styles.num}>{format.num}</span>
            <h3>{format.title}</h3>
            <p>{format.description}</p>
            <p className={styles.requirements}>
              <strong>Requirements:</strong> {format.requirements}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
