import styles from "./Formats.module.css";

const formats = [
  {
    num: "01 - CLOSE-UP",
    title: "The Close-Up Experience",
    description:
      "World-class mentalism up close, whether that's close-up mingling through the room or a dedicated space in Edwin's signature Magic Booth, a place where guests can step into the experience for a moment, ten minutes, or the entire evening, all on their own terms. As reactions build and word spreads, a quiet buzz develops across the room.",
  },
  {
    num: "02 - PRIVATE SHOW",
    title: "The Private Show Experience",
    description:
      "Turn your event into a private theatre. Picture a moment where the entire room comes together: guests drawn in, attention held, reactions shared. As Edwin reveals thoughts, predicts decisions and shapes moments of magic around the people in the room. The same experience that has entertained celebrities and UHNW audiences from resorts in the Maldives to intimate dinners in Miami.",
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
          </div>
        ))}
      </div>
    </section>
  );
}
