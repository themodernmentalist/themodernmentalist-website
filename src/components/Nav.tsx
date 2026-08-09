"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <nav className={styles.nav}>
      <Link href="/" className={`${styles.logo} ${styles.desktopLogo}`}>
        EDWIN
      </Link>
      <button
        className={`${styles.logo} ${styles.mobileLogoBtn}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        {isOpen ? "CLOSE" : "EDWIN"}
      </button>
      <div className={styles.links}>
        {links
          .filter((link) => link.label !== "Home")
          .map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
      </div>

      {isOpen && (
        <div className={styles.overlay}>
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
