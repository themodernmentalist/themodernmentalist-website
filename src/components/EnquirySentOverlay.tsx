"use client";

import { useEffect } from "react";
import ThankYou from "./ThankYou";
import styles from "./EnquirySentOverlay.module.css";

export default function EnquirySentOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Thank you for your enquiry"
    >
      <button type="button" className={styles.close} onClick={onClose}>
        Close ✕
      </button>
      <ThankYou />
    </div>
  );
}
