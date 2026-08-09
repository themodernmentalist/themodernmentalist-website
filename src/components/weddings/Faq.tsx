import styles from "./Faq.module.css";

export const faqs = [
  {
    question: "How do I know Edwin is the right choice for our wedding?",
    answer:
      "Edwin creates modern, engaging experiences designed to resonate with every type of guest, from the curious to the sceptical. Working closely with you, he ensures the experience fits your day, your venue and the atmosphere you're building, without ever overtaking it.",
  },
  {
    question: "When does Edwin perform during the day?",
    answer:
      "The Magic Booth or close-up mingling works well during the drinks reception, the wedding breakfast, or the evening reception, wherever there's a natural lull to fill. The 10 Minute Show is best placed once guests are settled, often just after speeches or before the first dance, as a highlight moment within the timeline.",
  },
  {
    question: "How long does Edwin perform for?",
    answer:
      "It's flexible, and tailored to your day. The Magic Booth can run for a moment, an hour, or the whole evening, with guests dropping in and out as they please. The 10 Minute Show, as the name suggests, is typically a tightly timed ten minutes, though it can be customised to run longer or shorter on request.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every wedding is unique, with its own venue, guest list and timeline, so availability and investment vary accordingly, with peak season dates in higher demand. Following an initial enquiry, a bespoke proposal is created to reflect your day.",
  },
  {
    question: "What's the booking process?",
    answer:
      "Once the details of your wedding are understood, a tailored proposal is created to reflect your requirements. Once the date is confirmed, deposit paid and contract signed, you'll be sent a short questionnaire and have support from the team throughout.",
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
