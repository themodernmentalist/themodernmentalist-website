"use client";

import { useEffect, useRef, useState } from "react";
import EnquirySentOverlay from "./EnquirySentOverlay";
import SealedLetter from "./SealedLetter";
import { BUDGETS, EVENT_TYPES, HEARD_FROM } from "@/lib/enquiry";
import styles from "./EnquiryForm.module.css";

type Status = "idle" | "sending" | "error";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sealing, setSealing] = useState<{
    name: string;
    message: string;
  } | null>(null);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [budget, setBudget] = useState("");
  const mountedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!eventType || !budget) {
      setStatus("error");
      setError(
        !eventType
          ? "Let Edwin know what kind of event it is."
          : "Pick a rough budget so Edwin can tailor his reply.",
      );
      return;
    }
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          eventType,
          phone: data.get("phone"),
          date: data.get("date"),
          location: data.get("location"),
          budget,
          heardFrom: data.get("heardFrom"),
          message: data.get("message"),
          company: data.get("company"),
          elapsed: Date.now() - mountedAt.current,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.(
        "event",
        "generate_lead",
      );
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const letter = {
        name: String(data.get("name") ?? ""),
        message: String(data.get("message") ?? ""),
      };
      formRef.current?.reset();
      setBudget("");
      setName("");
      setEventType("");
      setStatus("idle");
      if (reduceMotion) setSent(true);
      else setSealing(letter);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <>
      <div className={styles.sheet}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <p className={styles.stamp}>Strictly confidential</p>
          <p className={`${styles.wide} ${styles.salutation}`}>Dear Edwin,</p>
          <fieldset className={`${styles.field} ${styles.wide}`}>
            <legend className={styles.label}>What kind of event?</legend>
            <div className={styles.chips}>
              {EVENT_TYPES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.chip} ${eventType === option ? styles.chipOn : ""}`}
                  aria-pressed={eventType === option}
                  onClick={() => setEventType(option)}
                >
                  {eventType === option && <span aria-hidden="true">✓ </span>}
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className={styles.field}>
            <span className={styles.label}>Your name</span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={120}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email address</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              Phone
            </span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              maxLength={40}
              placeholder="+44, country code please"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Event date</span>
            <input name="date" type="date" required />
          </label>
          <label className={`${styles.field} ${styles.wide}`}>
            <span className={styles.label}>Where is the event?</span>
            <input
              name="location"
              type="text"
              required
              maxLength={200}
              placeholder="Venue, town or country"
            />
          </label>

          <fieldset
            className={`${styles.field} ${styles.wide} ${styles.budget}`}
          >
            <legend className={styles.label}>Entertainment budget</legend>
            <div className={styles.chips}>
              {BUDGETS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.chip} ${budget === option ? styles.chipOn : ""}`}
                  aria-pressed={budget === option}
                  onClick={() => setBudget(option)}
                >
                  {budget === option && <span aria-hidden="true">✓ </span>}
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className={`${styles.field} ${styles.wide}`}>
            <span className={styles.label}>How did you find Edwin?</span>
            <select name="heardFrom" defaultValue="" required>
              <option value="">Select…</option>
              {HEARD_FROM.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className={`${styles.field} ${styles.wide}`}>
            <span className={styles.label}>
              Tell Edwin about the evening{" "}
              <span className={styles.optional}>guests, vibe, anything</span>
            </span>
            <textarea name="message" rows={4} maxLength={4000} required />
          </label>

          {/* Honeypot: real people never see or fill this. */}
          <div className={styles.trap} aria-hidden="true">
            <label>
              Company
              <input
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className={`${styles.wide} ${styles.signoff}`}>
            <p className={styles.sincerely}>Yours sincerely,</p>
            <p className={styles.signature}>{name.trim() || "\u00A0"}</p>
          </div>

          <div className={`${styles.wide} ${styles.actions}`}>
            <button
              type="submit"
              className={styles.submit}
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                "Sending…"
              ) : (
                <>
                  Send the invitation <span className={styles.arrow}>→</span>
                </>
              )}
            </button>
          </div>
          <p className={`${styles.wide} ${styles.error}`} role="alert">
            {status === "error" ? error : ""}
          </p>
        </form>
      </div>
      {sealing && (
        <SealedLetter
          name={sealing.name}
          message={sealing.message}
          onDone={() => {
            setSealing(null);
            setSent(true);
          }}
        />
      )}
      <EnquirySentOverlay open={sent} onClose={() => setSent(false)} />
    </>
  );
}
