import type { Metadata } from "next";
import Nav from "@/components/Nav";
import WeddingsHero from "@/components/weddings/WeddingsHero";
import Showreel from "@/components/Showreel";
import Formats from "@/components/weddings/Formats";
import Testimonials from "@/components/weddings/Testimonials";
import Faq, { faqs } from "@/components/weddings/Faq";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wedding Magician London | Edwin Todd, The Modern Mentalist",
  description:
    "Book a wedding magician and mentalist for weddings in London, the UK and destination weddings worldwide. Close-up mentalism woven seamlessly into your day, from Britain's Got Talent finalist Edwin Todd.",
  alternates: {
    canonical: "/weddings",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Wedding Entertainment",
  provider: {
    "@type": "Person",
    name: "Edwin Todd",
    alternateName: "The Modern Mentalist",
  },
  areaServed: ["London", "United Kingdom", "Worldwide"],
  name: "Wedding Magician and Mentalist for Hire, London",
  description:
    "Close-up mentalism woven into weddings in London, the UK and a select number of destination weddings each year.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function WeddingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <WeddingsHero />
      <Showreel />
      <Formats />
      <Testimonials />
      <Faq />
      <Enquire />
      <Footer />
    </>
  );
}
