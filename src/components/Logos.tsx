import styles from "./Logos.module.css";

const clients = ["L'ORÉAL", "META", "FORMULA 1", "SPOTIFY", "MONZO", "BREITLING"];

export default function Logos() {
  return (
    <section className={styles.logos}>
      {clients.map((client) => (
        <span key={client}>{client}</span>
      ))}
    </section>
  );
}
