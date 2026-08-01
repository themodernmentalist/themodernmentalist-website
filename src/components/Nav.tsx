import Link from "next/link";
import styles from "./Nav.module.css";

const links = [
  { href: "/corporate", label: "Corporate" },
  { href: "/private-events", label: "Private" },
  { href: "/weddings", label: "Weddings" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire" },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        EDWIN
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
