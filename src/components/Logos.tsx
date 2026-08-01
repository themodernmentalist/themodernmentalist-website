import Image from "next/image";
import styles from "./Logos.module.css";

const clients = [
  { name: "L'Oréal", file: "loreal", width: 130 },
  { name: "Meta", file: "meta", width: 100 },
  { name: "Spotify", file: "spotify", width: 44 },
  { name: "Monzo", file: "monzo", width: 100 },
  { name: "Breitling", file: "breitling", width: 110 },
  { name: "Sky", file: "sky", width: 60 },
  { name: "Warner Bros", file: "warner-bros", width: 48 },
  { name: "EY", file: "ey", width: 56 },
  { name: "PGA Tour", file: "pga-tour", width: 44 },
  { name: "Checkout.com", file: "checkout", width: 52 },
  { name: "Four Seasons", file: "four-seasons", width: 100 },
  { name: "Soho House", file: "soho-house", width: 100 },
  { name: "Soneva", file: "soneva", width: 100 },
  { name: "Explora Journeys", file: "explora-journeys", width: 70 },
];

export default function Logos() {
  return (
    <section className={styles.logos}>
      {clients.map((client) => (
        <span key={client.file} className={styles.logo} style={{ width: client.width }}>
          <Image
            src={`/images/logos/${client.file}.png`}
            alt={client.name}
            width={client.width}
            height={40}
            className={styles.image}
            style={{ width: "100%", height: "auto" }}
          />
        </span>
      ))}
    </section>
  );
}
