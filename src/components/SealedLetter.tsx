"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SealedLetter.module.css";

// How long the sealed envelope rests before it flies away, and how long the
// fly-away animation takes (keep in step with SealedLetter.module.css).
const REST_MS = 1200;
const FLY_MS = 700;

// A hand-poured wax blob: a circle with a slightly irregular edge.
function waxPath(radius: number) {
  const points = 72;
  let d = "";
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const r =
      radius *
      (1 + 0.035 * Math.sin(5 * a) + 0.025 * Math.sin(9 * a + 1.3) + 0.015 * Math.sin(17 * a));
    const x = 50 + r * Math.cos(a);
    const y = 50 + r * Math.sin(a);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + "Z";
}

const WAX = waxPath(42);

function Sheet({ name, message }: { name: string; message: string }) {
  return (
    <div className={styles.sheet}>
      <p className={styles.head}>The Modern Mentalist</p>
      <span className={styles.rule} />
      <p className={styles.dear}>Dear Edwin,</p>
      <p className={styles.body}>{message}</p>
      <p className={styles.yours}>Yours, {name}</p>
    </div>
  );
}

export default function SealedLetter({
  name,
  message,
  onDone,
}: {
  name: string;
  message: string;
  onDone: () => void;
}) {
  const done = useRef(onDone);
  done.current = onDone;
  const [sealed, setSealed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") done.current();
    };
    window.addEventListener("keydown", onKey);
    const pending = timers.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      pending.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function press() {
    if (sealed) return;
    setSealed(true);
    timers.current.push(
      window.setTimeout(() => setLeaving(true), REST_MS),
      window.setTimeout(() => done.current(), REST_MS + FLY_MS),
    );
  }

  const firstName = name.trim().split(/\s+/)[0] || "A friend";
  const initial = (firstName.match(/\p{L}/u)?.[0] ?? "E").toUpperCase();
  const note = message.trim().slice(0, 140);

  return (
    <div
      className={`${styles.scene} ${sealed ? styles.sealed : ""} ${leaving ? styles.leaving : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sealing your enquiry"
    >
      <div className={styles.fly}>
        <div className={styles.thump}>
          <div className={styles.stage}>
            <div className={`${styles.env} ${styles.envBack}`} />

            <div className={styles.letterSlide}>
              <div className={styles.letter}>
                <div className={`${styles.panel} ${styles.p1}`}>
                  <div className={styles.face}>
                    <div className={styles.sheetPos} style={{ top: "0%" }}>
                      <Sheet name={firstName} message={note} />
                    </div>
                  </div>
                  <div className={styles.back} />
                </div>
                <div className={`${styles.panel} ${styles.p2}`}>
                  <div className={styles.face}>
                    <div className={styles.sheetPos} style={{ top: "-100%" }}>
                      <Sheet name={firstName} message={note} />
                    </div>
                    <div className={styles.shade} />
                  </div>
                </div>
                <div className={`${styles.panel} ${styles.p3}`}>
                  <div className={styles.face}>
                    <div className={styles.sheetPos} style={{ top: "-200%" }}>
                      <Sheet name={firstName} message={note} />
                    </div>
                  </div>
                  <div className={styles.back} />
                </div>
              </div>
            </div>

            <div className={`${styles.env} ${styles.envFrontWrap}`}>
              <div className={styles.envFront} />
            </div>
            <div className={`${styles.env} ${styles.envFlap}`} />
            <div className={`${styles.env} ${styles.envShadow}`} />
            <div className={`${styles.env} ${styles.envSeam}`} />

            <div className={styles.target} aria-hidden="true" />

            <div className={styles.seal} aria-hidden="true">
              <span className={styles.ripple} />
              <svg viewBox="0 0 100 100" className={styles.sealSvg}>
                <defs>
                  <radialGradient id="wax" cx="38%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="#c8403b" />
                    <stop offset="50%" stopColor="#9c2623" />
                    <stop offset="100%" stopColor="#5e1211" />
                  </radialGradient>
                  <radialGradient id="waxInner" cx="42%" cy="36%" r="75%">
                    <stop offset="0%" stopColor="#a82a27" />
                    <stop offset="100%" stopColor="#7a1a18" />
                  </radialGradient>
                  <filter id="bevel" x="-12%" y="-12%" width="124%" height="124%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.3" result="b" />
                    <feSpecularLighting in="b" surfaceScale="4" specularConstant="1.3" specularExponent="30" lightingColor="#ffd2c8" result="s">
                      <feDistantLight azimuth="225" elevation="20" />
                    </feSpecularLighting>
                    <feComposite in="s" in2="SourceAlpha" operator="in" result="sIn" />
                    <feComposite in="SourceGraphic" in2="sIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                  </filter>
                </defs>
                <path d={WAX} fill="url(#wax)" filter="url(#bevel)" />
                <circle cx="50" cy="50" r="30" fill="url(#waxInner)" stroke="#5e1211" strokeWidth="1.6" filter="url(#bevel)" />
                <text x="50.7" y="64.6" textAnchor="middle" fontSize={initial === "W" || initial === "M" ? 31 : 38} fontFamily="var(--font-fraunces), serif" fontWeight="700" fill="#3f0a09" fillOpacity="0.65">{initial}</text>
                <text x="50" y="63.8" textAnchor="middle" fontSize={initial === "W" || initial === "M" ? 31 : 38} fontFamily="var(--font-fraunces), serif" fontWeight="700" fill="#8f2220" filter="url(#bevel)">{initial}</text>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.below}>
          <button type="button" className={styles.press} onClick={press} disabled={sealed}>
            Press to wax seal
          </button>
          <p className={styles.caption}>Sealed. On its way to Edwin.</p>
        </div>
      </div>
      <button type="button" className={styles.skip} onClick={() => done.current()}>
        Skip
      </button>
    </div>
  );
}
