import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Showreel from "@/components/Showreel";
import Logos from "@/components/Logos";
import VipQuotes from "@/components/VipQuotes";
import Proof from "@/components/Proof";
import Discretion from "@/components/Discretion";
import Settings from "@/components/Settings";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Edwin Todd",
    alternateName: "The Modern Mentalist",
    jobTitle: "Mentalist",
    url: "https://themodernmentalist.com",
    sameAs: [
      "https://www.instagram.com/themodernmentalist/",
      "https://uk.linkedin.com/in/edwin-todd-the-modern-mentalist-7a9511154",
    ],
    description:
      "Edwin Todd is a Britain's Got Talent finalist and mentalist based in London, performing at corporate, private and wedding events worldwide.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Modern Mentalist",
    url: "https://themodernmentalist.com",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <Hero />
      <Stats />
      <Showreel />
      <Logos />
      <VipQuotes />
      <Proof />
      <Discretion />
      <Settings />
      <Enquire />
      <Footer />
    </>
  );
}
