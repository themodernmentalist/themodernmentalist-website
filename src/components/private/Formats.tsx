import { HandNote } from "../Annotate";
import styles from "./Formats.module.css";

const formats = [
  {
    num: "01 - CLOSE-UP",
    title: "The Close-Up Experience",
    description:
      "World-class mentalism up close, mingling through the room or in Edwin's signature Magic Booth, guests can step in for a moment or the whole evening, entirely on their own terms. Reactions build, word spreads, and a quiet buzz takes over the room.",
    note: "this is even better when they think I'm just another guest",
  },
  {
    num: "02 - PRIVATE SHOW",
    title: "The Private Show Experience",
    description:
      "Turn your event into a private theatre. The entire room comes together: guests drawn in, attention held, reactions shared, as Edwin reveals thoughts and shapes moments of magic around the people in the room. The same experience that's entertained celebrities and UHNW audiences from the Maldives to Miami.",
  },
  {
    num: "03 - HOSTING",
    title: "The Host",
    description:
      "Edwin holds the room as host, bringing clarity, energy and flow to your event, while weaving in moments of magic and mentalism that elevate the atmosphere without ever disrupting it.",
  },
];

export default function Formats() {
  return (
    <section className={styles.formats}>
      <span className={`eyebrow ${styles.eyebrow}`}>An Experience Your Guests Won&apos;t Forget</span>
      <h2>Three ways to bring Edwin into the room.</h2>
      <div className={styles.grid}>
        {formats.map((format) => (
          <div className={styles.card} key={format.num}>
            <span className={styles.num}>{format.num}</span>
            <h3>{format.title}</h3>
            <p>{format.description}</p>
            {format.note && (
              <HandNote className={styles.note} color="var(--poster-yellow)">
                {format.note}
              </HandNote>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
