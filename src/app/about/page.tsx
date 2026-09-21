import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AboutHero from "@/components/about/AboutHero";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Edwin Todd | The Modern Mentalist",
  description:
    "Edwin Todd is a mentalist based in London who earned four yeses on Britain's Got Talent, performing at corporate, private and wedding events worldwide.",
  alternates: {
    canonical: "/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edwin Todd",
  alternateName: "The Modern Mentalist",
  jobTitle: "Mentalist",
  url: "https://themodernmentalist.com/about",
  sameAs: [
    "https://www.instagram.com/themodernmentalist/",
    "https://uk.linkedin.com/in/edwin-todd-the-modern-mentalist-7a9511154",
  ],
  description:
    "Edwin Todd's fascination with magic and mentalism began at eleven. Today he performs on stages and at events around the world, having earned four yeses on Britain's Got Talent, working with corporate and private clients across London and worldwide.",
  knowsAbout: ["Mentalism", "Magic", "Close-up magic", "Corporate entertainment", "Event hosting"],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <AboutHero />
      <Enquire />
      <Footer />
    </>
  );
}
