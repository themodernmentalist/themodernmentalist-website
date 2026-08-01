import styles from "./VipQuotes.module.css";

const quotes = [
  { quote: "Absolutely blown away.", name: "Simon Cowell", role: "Britain's Got Talent Judge" },
  { quote: "What the ****", name: "Sean Paul", role: "Musician" },
  { quote: "You are insane.", name: "Rio Ferdinand", role: "Former England Footballer" },
  { quote: "So original.", name: "Jay Shetty", role: "Author & Podcast Host" },
];

export default function VipQuotes() {
  return (
    <section className={styles.section}>
      <span className={`eyebrow ${styles.eyebrow}`}>In Their Words</span>
      <div className={styles.grid}>
        {quotes.map((item) => (
          <div className={styles.item} key={item.name}>
            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            <p className={styles.name}>{item.name}</p>
            <p className={`eyebrow ${styles.role}`}>{item.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
