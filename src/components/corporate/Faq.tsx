"use client";

import { useState } from "react";
import styles from "./Faq.module.css";

const faqs = [
  {
    question: "How do I know Edwin is the right choice for my event?",
    answer:
      "Edwin creates modern, engaging experiences designed to resonate with every type of audience, from the curious to the sceptical. Working closely with you, he ensures the experience aligns with your event goals and integrates seamlessly into the flow of the evening.",
  },
  {
    question: "How long does Edwin perform for?",
    answer:
      "It's flexible, and tailored to the structure of your event. Typically a set runs 10 to 45 minutes, and is most effective once guests are settled. Close-up works well either as a pre-dinner drinks reception (timing depends on guest numbers) or after the meal.",
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.faq}>
      <span className={`eyebrow ${styles.eyebrow}`}>FAQs</span>
      <h2>There are no bad questions.</h2>
      <div className={styles.list}>
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div className={styles.item} key={item.question}>
              <button
                className={styles.question}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {item.question}
                <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p className={styles.answer}>{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
