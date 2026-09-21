import styles from "./Formats.module.css";

const formats = [
  {
    num: "01 - DRINKS RECEPTION",
    title: "Close-Up, Table to Table",
    description: "The perfect icebreaker for a room that hasn't warmed up yet.",
  },
  {
    num: "02 - THE HIGHLIGHT",
    title: "The Stage Set",
    description: "The unforgettable moment they'll still be talking about next Christmas.",
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
        {formats.map((format) => (
          <div className={styles.card} key={format.num}>
            <span className={styles.num}>{format.num}</span>
            <h3>{format.title}</h3>
            <p>{format.description}</p>
          </div>
        ))}
      </div>
      <a className={styles.cta} href="#enquire">
        Enquire →
      </a>
    </section>
  );
}
