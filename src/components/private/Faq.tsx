import styles from "./Faq.module.css";

export const faqs = [
  {
    question: "How do I know Edwin is the right choice for my event?",
    answer:
      "Edwin creates modern, engaging experiences designed to resonate with every type of guest, from the curious to the sceptical. Working closely with you, he ensures the experience fits your event and the atmosphere you're building, without ever overtaking it.",
  },
  {
    question: "How long does Edwin perform for?",
    answer:
      "It's flexible, and tailored to your event. The Magic Booth can run for a moment, ten minutes, or the entire evening, with guests dropping in as they please. The Private Show is typically timed to become a highlight moment within the evening.",
  },
  {
    question: "What does the experience cost?",
    answer:
      "Every event is unique, with its own setting, scale and requirements, so availability and investment vary accordingly, with peak periods in higher demand. Following an initial enquiry, a bespoke proposal is created to reflect your event.",
  },
  {
    question: "What is the booking process?",
    answer:
      "Once the details of your event are understood, a tailored proposal is created to reflect your requirements. Once the date is confirmed, deposit paid and contract signed, you'll be sent a short questionnaire and have support from the team throughout.",
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
