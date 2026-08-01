import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CorporateHero from "@/components/corporate/CorporateHero";
import Expect from "@/components/corporate/Expect";
import Formats from "@/components/corporate/Formats";
import Logos from "@/components/Logos";
import Testimonials from "@/components/corporate/Testimonials";
import Faq from "@/components/corporate/Faq";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Corporate Mentalist London | Edwin Todd, The Modern Mentalist",
  description:
    "Book a corporate mentalist for events, conferences and company parties in London and worldwide. Close-up magic, stage shows and full-event hosting from Britain's Got Talent finalist Edwin Todd. Trusted by L'Oreal, Meta, Formula One and Spotify.",
  alternates: {
    canonical: "/corporate",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Corporate Entertainment",
  provider: {
    "@type": "Person",
    name: "Edwin Todd",
    alternateName: "The Modern Mentalist",
  },
  areaServed: ["London", "United Kingdom", "Worldwide"],
  name: "Corporate Mentalist and Magician for Hire, London",
  description:
    "Close-up mentalism, stage performances, and event hosting for corporate events, conferences and company parties in London and worldwide.",
};

export default function CorporatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <CorporateHero />
      <Expect />
      <Formats />
      <Logos />
      <Testimonials />
      <Faq />
      <Enquire />
      <Footer />
    </>
  );
}
