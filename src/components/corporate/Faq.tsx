import styles from "./Faq.module.css";

export const faqs = [
  {
    question: "How do I know Edwin is the right choice for my event?",
    answer:
      "Edwin creates modern, engaging experiences designed to resonate with every type of audience, from the curious to the sceptical. Working closely with you, he ensures the experience aligns with your event goals and integrates seamlessly into the flow of the evening.",
  },
  {
    question: "How long does Edwin perform for?",
    answer:
      "It's flexible, and tailored to the structure of your event. The stage set runs 10 to 45 minutes, and is most effective once guests are settled. Close-up usually runs longer than this, with timing dependent on the number of guests.",
  },
  {
    question: "When does Edwin perform?",
    answer:
      "Close-up works well either as a pre-dinner drinks reception or after the meal. The stage set is best placed once guests are settled in, as a highlight moment within the evening.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every event is unique, with its own setting, scale and requirements, so availability and investment vary accordingly, with peak periods in higher demand. Following an initial enquiry, a bespoke proposal is created to reflect your event.",
  },
  {
    question: "What's the booking process?",
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
