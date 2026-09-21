import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ChristmasHero from "@/components/christmas/ChristmasHero";
import Stats from "@/components/Stats";
import Showreel from "@/components/Showreel";
import Logos from "@/components/Logos";
import Formats from "@/components/christmas/Formats";
import Testimonials from "@/components/christmas/Testimonials";
import AboutLink from "@/components/christmas/AboutLink";
import Faq, { faqs } from "@/components/christmas/Faq";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";

const PAGE_TITLE = "Christmas Party Magician & Mentalist London | Edwin Todd";
const PAGE_DESCRIPTION =
  "Book Edwin for your office Christmas party: mind-reading your guests won't forget, with four yeses on Britain's Got Talent. Close-up magic and stage shows in London.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "christmas party magician london",
    "christmas party mentalist",
    "corporate christmas party entertainment london",
    "office christmas party entertainer",
    "christmas party magician",
    "hire a mentalist for christmas party",
  ],
  alternates: {
    canonical: "/christmas-party",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "https://themodernmentalist.com/christmas-party",
    siteName: "The Modern Mentalist",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/images/corporate-hero.jpg",
        width: 1206,
        height: 804,
        alt: "Edwin performing mentalism at a corporate Christmas party",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/images/corporate-hero.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://themodernmentalist.com/christmas-party#service",
  serviceType: "Christmas Party Entertainment",
  provider: {
    "@type": "Person",
    name: "Edwin Todd",
    alternateName: "The Modern Mentalist",
    url: "https://themodernmentalist.com/about",
    sameAs: [
      "https://www.instagram.com/themodernmentalist/",
      "https://uk.linkedin.com/in/edwin-todd-the-modern-mentalist-7a9511154",
    ],
  },
  areaServed: ["London", "United Kingdom", "Worldwide"],
  name: "Christmas Party Magician and Mentalist for Hire, London",
  url: "https://themodernmentalist.com/christmas-party",
  image: "https://themodernmentalist.com/images/corporate-hero.jpg",
  description:
    "Close-up mentalism, stage performances, and hosting for corporate Christmas parties in London and worldwide, from a mentalist who earned four yeses on Britain's Got Talent.",
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

export default function ChristmasPartyPage() {
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
      <ChristmasHero />
      <Showreel />
      <Stats />
      <Logos />
      <Formats />
      <Testimonials />
      <AboutLink />
      <Faq />
      <Enquire />
      <Footer />
    </>
  );
}
