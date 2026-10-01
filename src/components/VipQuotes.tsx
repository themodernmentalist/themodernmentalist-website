import { Circle, MarkerWrite } from "./Annotate";
import styles from "./VipQuotes.module.css";

const featured = {
  quote: "Absolutely blown away, one of the best magic acts we've seen.",
  name: "Simon Cowell",
  role: "Britain's Got Talent Judge",
};

const quotes = [
  { quote: "What the ****", name: "Sean Paul", role: "Musician" },
  { quote: "You are insane.", name: "Rio Ferdinand", role: "Former England Footballer" },
  { quote: "So original.", name: "Jay Shetty", role: "Author & Podcast Host" },
];

const featuredQuoteText = `“${featured.quote}”`;
const featuredQuoteDuration = Math.min(2.6, Math.max(0.7, featuredQuoteText.length * 0.045));

export default function VipQuotes({
  featuredOnly = false,
}: {
  featuredOnly?: boolean;
}) {
  return (
    <section className={styles.section}>
      {!featuredOnly && (
        <span className={`eyebrow ${styles.eyebrow}`}>In Their Words</span>
      )}
      <div className={`${styles.featured} ${featuredOnly ? styles.featuredLast : ""}`}>
        <p className={`${styles.featuredQuote} ${featuredOnly ? styles.featuredQuoteSmall : ""}`}>
          <MarkerWrite
            text={featuredQuoteText}
            fontSize="1.15em"
            className={featuredOnly ? styles.nowrapQuote : ""}
          />
        </p>
        <p className={styles.featuredName}>
          <Circle delay={featuredQuoteDuration}>{featured.name}</Circle>
        </p>
        <p className={`eyebrow ${styles.featuredRole}`}>{featured.role}</p>
      </div>
      {!featuredOnly && (
        <div className={styles.grid}>
          {quotes.map((item) => (
            <div className={styles.item} key={item.name}>
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <p className={styles.name}>{item.name}</p>
              <p className={`eyebrow ${styles.role}`}>{item.role}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
