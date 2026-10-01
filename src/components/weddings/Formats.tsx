import styles from "./Formats.module.css";

const formats = [
  {
    num: "01 - CLOSE-UP",
    title: "The Close-Up Experience",
    description:
      "World-class mentalism at the drinks reception, table-side during the wedding breakfast, or in Edwin's signature Magic Booth, a dedicated space guests step into on their own terms, for a moment or much longer, without ever interrupting the flow of your day.",
    descriptionMobile:
      "World-class mentalism at the drinks reception, table-side, or in Edwin's signature Magic Booth, on your guests' own terms.",
  },
  {
    num: "02 - THE ADD-ON",
    title: "The 10 Minute Show",
    description:
      "Turn your wedding into a private theatre, for just a moment. A carefully timed experience that brings the whole room together: guests drawn in, attention held, reactions shared. In just ten minutes, Edwin reveals thoughts, predicts decisions, and creates something shaped entirely around the people in the room.",
    descriptionMobile:
      "Turn your wedding into a private theatre for ten minutes. Edwin reveals thoughts and predicts decisions, shaped around your guests.",
  },
  {
    num: "03 - HOSTING",
    title: "The Host",
    description:
      "Edwin holds the room as host, bringing clarity, energy and flow to your reception, guiding guests through speeches, the first dance and the moments that matter, while weaving in flashes of magic and mentalism that elevate the atmosphere without ever disrupting it.",
    descriptionMobile:
      "Edwin holds the room as host, guiding guests through speeches and the first dance, while weaving in moments of magic and mentalism.",
  },
];

export default function Formats() {
  return (
    <section className={styles.formats}>
      <span className={`eyebrow ${styles.eyebrow}`}>Tailored To Your Day</span>
      <h2>Three ways to bring Edwin into your day.</h2>
      <div className={styles.grid}>
        {formats.map((format) => (
          <div className={styles.card} key={format.num}>
            <span className={styles.num}>{format.num}</span>
            <h3>{format.title}</h3>
            <p className={styles.descDesktop}>{format.description}</p>
            <p className={styles.descMobile}>{format.descriptionMobile}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
