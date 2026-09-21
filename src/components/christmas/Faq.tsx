import styles from "./Faq.module.css";

export const faqs = [
  {
    question: "How far in advance should we book a Christmas party magician?",
    answer:
      "As early as you can. December is the most popular month of the year, so getting in touch early gives you the best chance of securing your preferred date.",
  },
  {
    question: "What size groups does this work for?",
    answer:
      "Any size works, from an intimate team dinner right up to parties of a few thousand guests.",
  },
  {
    question: "Can the performance be tailored to our company?",
    answer:
      "Absolutely, every performance is built around your company, your guests and the room on the night.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on your venue, number of guests and the format you choose. Get in touch and you'll receive a bespoke proposal for your event.",
  },
  {
    question: "Do you perform at Christmas parties outside London?",
    answer:
      "Yes, Edwin performs regularly across the UK and internationally, so wherever your party is, get in touch and we'll make it work.",
  },
];

export default function Faq() {
  return (
    <section className={styles.faq}>
      <span className={`eyebrow ${styles.eyebrow}`}>FAQs</span>
      <h2>There are no bad questions.</h2>
      <div className={styles.list}>
        {faqs.map((item) => (
          <details className={styles.item} key={item.question}>
            <summary className={styles.question}>
              {item.question}
              <span className={styles.icon} aria-hidden="true" />
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
