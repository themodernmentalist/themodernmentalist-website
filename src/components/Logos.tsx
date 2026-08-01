import Image from "next/image";
import styles from "./Logos.module.css";

// Intrinsic pixel dimensions of each processed logo (all normalized to 400px
// tall during processing), used so next/image can compute the correct aspect
// ratio when we constrain every logo to the same display height in CSS.
const clients = [
  { name: "L'Oréal", file: "loreal", width: 2096, height: 400, displayHeight: 17 },
  { name: "Meta", file: "meta", width: 569, height: 400 },
  { name: "Spotify", file: "spotify", width: 399, height: 400 },
  { name: "Monzo", file: "monzo", width: 710, height: 400 },
  { name: "Breitling", file: "breitling", width: 877, height: 400 },
  { name: "Sky", file: "sky", width: 651, height: 400 },
  { name: "Warner Bros", file: "warner-bros", width: 328, height: 400 },
  { name: "EY", file: "ey", width: 396, height: 400 },
  { name: "PGA Tour", file: "pga-tour", width: 313, height: 400 },
  { name: "Checkout.com", file: "checkout", width: 369, height: 400 },
  { name: "Four Seasons", file: "four-seasons", width: 868, height: 400 },
  { name: "Soho House", file: "soho-house", width: 647, height: 400 },
  { name: "Soneva", file: "soneva", width: 704, height: 400 },
  { name: "Explora Journeys", file: "explora-journeys", width: 498, height: 400 },
];

function LogoTrack({ suffix }: { suffix: string }) {
  return (
    <div className={styles.track} aria-hidden={suffix !== "a"}>
      {clients.map((client) => (
        <span
          key={`${client.file}-${suffix}`}
          className={styles.logo}
          style={
            client.displayHeight ? { height: client.displayHeight } : undefined
          }
        >
          <Image
            src={`/images/logos/${client.file}.png`}
            alt={client.name}
            width={client.width}
            height={client.height}
            className={styles.image}
          />
        </span>
      ))}
    </div>
  );
}

export default function Logos() {
  return (
    <section className={styles.logos}>
      <div className={styles.marquee}>
        <LogoTrack suffix="a" />
        <LogoTrack suffix="b" />
      </div>
    </section>
  );
}
