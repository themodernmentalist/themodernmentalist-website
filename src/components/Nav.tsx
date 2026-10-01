"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HandNote, CurvedArrow } from "./Annotate";
import styles from "./Nav.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/corporate", label: "Corporate" },
  { href: "/private-events", label: "Private" },
  { href: "/weddings", label: "Weddings" },
  { href: "/about", label: "About" },
  { href: "#enquire", label: "Enquire" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const heroCta = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href="#enquire"]')
    ).find((el) => !el.closest("nav"));
    if (!heroCta) return;

    const checkScroll = () => {
      setShowMobileCta(heroCta.getBoundingClientRect().bottom < 0);
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={`${styles.logo} ${styles.desktopLogo}`}>
        EDWIN
      </Link>
      <div className={styles.mobileBrand}>
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`${styles.hamburgerLine} ${isOpen ? styles.lineOpen1 : ""}`}
          />
          <span
            className={`${styles.hamburgerLine} ${isOpen ? styles.lineOpen2 : ""}`}
          />
          <span
            className={`${styles.hamburgerLine} ${isOpen ? styles.lineOpen3 : ""}`}
          />
        </button>
        <Link href="/" className={`${styles.logo} ${styles.mobileLogo}`}>
          EDWIN
        </Link>
      </div>
      <div className={styles.links}>
        {links
          .filter((link) => link.label !== "Home")
          .map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
      </div>

      <a
        href="#enquire"
        className={`${styles.mobileCta} ${showMobileCta ? styles.mobileCtaVisible : ""}`}
      >
        Enquire →
      </a>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.menuNote}>
            <HandNote color="var(--poster-yellow)">menu</HandNote>
            <CurvedArrow className={styles.menuArrow} />
          </div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
