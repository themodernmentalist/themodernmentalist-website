import styles from "./Credits.module.css";

const billing = [
  { role: "Starring", name: "Your Guests" },
  { role: "Also starring", name: "The Colleague Who “Doesn’t Believe In This Stuff”" },
  { role: "With", name: "Everyone Who Whispered “How?”" },
  { role: "And introducing", name: "Your Boss, Completely Baffled" },
];

export default function Credits() {
  return (
    <section className={styles.credits} aria-label="Credits">
      <p className={styles.presents}>A Modern Mentalist Production</p>
      <dl className={styles.billing}>
        {billing.map((item) => (
          <div key={item.role}>
            <dt className={styles.role}>{item.role}</dt>
            <dd className={styles.name}>{item.name}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.disclaimer}>
        No one was embarrassed in the making of this evening.
      </p>
    </section>
  );
}
