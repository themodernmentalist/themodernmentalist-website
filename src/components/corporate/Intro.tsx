import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={styles.intro}>
      <p>
        Edwin is a London-based mentalist working with companies across
        finance, tech, luxury retail and motorsport, on conferences, product
        launches and company parties in London and worldwide.
      </p>
      <p>
        Every set is built around the room he&apos;s walking into. Guests
        aren&apos;t just watching. They&apos;re involved, reacting, and
        leaving with something they can&apos;t quite explain.
      </p>
    </section>
  );
}
