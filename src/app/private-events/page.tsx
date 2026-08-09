import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PrivateHero from "@/components/private/PrivateHero";
import Showreel from "@/components/Showreel";
import Formats from "@/components/private/Formats";
import Testimonials from "@/components/private/Testimonials";
import Discretion from "@/components/Discretion";
import Faq, { faqs } from "@/components/private/Faq";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Private Events Mentalist London | Edwin Todd, The Modern Mentalist",
  description:
    "Book a mentalist for private events, luxury celebrations and UHNW gatherings in London and worldwide. Close-up mentalism from Britain's Got Talent finalist Edwin Todd.",
  alternates: {
    canonical: "/private-events",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Private Event Entertainment",
  provider: {
    "@type": "Person",
    name: "Edwin Todd",
    alternateName: "The Modern Mentalist",
  },
  areaServed: ["London", "United Kingdom", "Worldwide"],
  name: "Private Events Mentalist and Magician for Hire, London",
  description:
    "Close-up mentalism and private show experiences for private events, luxury celebrations and UHNW gatherings in London and worldwide.",
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

export default function PrivateEventsPage() {
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
      <PrivateHero />
      <Showreel />
      <Formats />
      <Testimonials />
      <Discretion />
      <Faq />
      <Enquire />
      <Footer />
    </>
  );
}
