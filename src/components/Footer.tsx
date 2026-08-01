import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>The Modern Mentalist © {new Date().getFullYear()}</span>
      <span>London &amp; Worldwide</span>
    </footer>
  );
}
