"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Annotate.module.css";

function useInView<T extends Element>(threshold = 0.6) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Underline({
  children,
  color = "var(--poster-yellow)",
  strokeWidth = 4,
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>();

  return (
    <span ref={ref} className={styles.underlineWrap}>
      {children}
      <svg
        className={styles.underlineSvg}
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2 11 C 40 17, 90 4, 130 9 S 190 15, 198 7"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          pathLength={100}
          className={visible ? styles.pathIn : styles.pathOut}
        />
      </svg>
    </span>
  );
}

/* A rough, straight-ish underline drawn as a few overlapping scribbled
   passes rather than one neat wavy stroke — like someone underlined a
   word quickly two or three times for emphasis. */
export function ScratchUnderline({
  children,
  color = "var(--poster-yellow)",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const passes = [
    { d: "M2 12 C 50 9, 150 14, 198 11", width: 4, delay: 0 },
    { d: "M3 16 C 60 18, 140 13, 197 16", width: 3, delay: 0.08 },
    { d: "M2 9 C 70 11, 130 8, 198 10", width: 3, delay: 0.16 },
  ];

  return (
    <span ref={ref} className={`${styles.underlineWrap} ${className}`}>
      {children}
      <svg
        className={styles.underlineSvg}
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {passes.map((pass, i) => (
          <path
            key={i}
            d={pass.d}
            fill="none"
            stroke={color}
            strokeWidth={pass.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            className={visible ? styles.pathIn : styles.pathOut}
            style={{ transitionDelay: `${pass.delay}s` }}
          />
        ))}
      </svg>
    </span>
  );
}

export function Circle({
  children,
  color = "var(--poster-yellow)",
  delay = 0,
}: {
  children: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>();

  return (
    <span ref={ref} className={styles.circleWrap}>
      <svg
        className={styles.circleSvg}
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 100 4 C 40 2, 6 20, 5 50 C 4 80, 40 98, 100 97 C 165 98, 196 78, 195 49 C 196 21, 162 3, 100 4"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={100}
          className={visible ? styles.pathIn : styles.pathOut}
          style={{ transitionDelay: `${delay}s` }}
        />
      </svg>
      {children}
    </span>
  );
}

/* A loose, hand-sketched curved arrow (not a straight unicode glyph) —
   the curve draws itself in, then the arrowhead strokes in just after,
   like it was doodled in one continuous motion. */
export function CurvedArrow({
  color = "var(--poster-yellow)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const { ref, visible } = useInView<SVGSVGElement>(0.4);

  return (
    <svg
      ref={ref}
      className={`${styles.curvedArrow} ${className}`}
      viewBox="0 0 90 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6 C 24 4, 52 12, 64 40 C 68 50, 70 58, 71 64"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        className={visible ? styles.pathIn : styles.pathOut}
      />
      <path
        d="M 61 51 L 71 64 L 76 49"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        className={visible ? styles.pathInHead : styles.pathOut}
      />
    </svg>
  );
}

/* A more theatrical version of the curved arrow — loops back on itself
   once before diving down to the point, like it was doodled with a
   flourish rather than a single clean stroke. */
export function LoopyArrow({
  color = "var(--poster-yellow)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const { ref, visible } = useInView<SVGSVGElement>(0.3);

  return (
    <svg
      ref={ref}
      className={`${styles.loopyArrow} ${className}`}
      viewBox="0 0 90 140"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 8 C 50 2, 64 18, 52 32 C 42 44, 22 40, 26 26 C 28 16, 42 14, 50 22 C 60 32, 46 66, 36 92 C 31 105, 27 117, 24 128"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        className={visible ? styles.pathIn : styles.pathOut}
      />
      <path
        d="M 31 120 L 24 128 L 22 117"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        className={visible ? styles.pathInHead : styles.pathOut}
      />
    </svg>
  );
}

/* Fakes a whiteboard-marker "writing" effect: the text sits behind a
   left-to-right reveal (like ink appearing under a moving nib), paced by
   character count so short lines snap and long ones take a beat longer. */
export function MarkerWrite({
  text,
  color = "var(--poster-yellow)",
  fontSize,
  className = "",
}: {
  text: string;
  color?: string;
  fontSize?: string;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.4);
  const duration = Math.min(2.6, Math.max(0.7, text.length * 0.045));

  return (
    <span ref={ref} className={styles.markerWriteWrap}>
      <span
        className={`${styles.markerWrite} ${visible ? styles.markerWriteIn : ""} ${className}`}
        style={{
          color,
          fontSize,
          transitionDuration: `${duration}s`,
        }}
      >
        {text}
      </span>
    </span>
  );
}

/* A rubber-stamp "CLASSIFIED" mark that slams onto the page — starts
   huge, rotated and invisible, then punches down to its resting size
   with a hard overshoot, like an ink stamp hitting paper. */
export function ClassifiedStamp({
  text = "CLASSIFIED",
  rotate = -10,
  fontSize,
  className = "",
}: {
  text?: string;
  rotate?: number;
  fontSize?: string;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`${styles.stampAnchor} ${className}`}>
      <div
        aria-hidden="true"
        className={`${styles.stamp} ${visible ? styles.stampIn : ""}`}
        style={
          {
            "--stamp-rotate": `${rotate}deg`,
            fontSize,
          } as React.CSSProperties
        }
      >
        {text}
      </div>
    </div>
  );
}

export function HandNote({
  children,
  className = "",
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.3);
  return (
    <span
      ref={ref}
      className={`${styles.handNote} ${visible ? styles.handNoteIn : ""} ${className}`}
      style={color ? { color } : undefined}
    >
      {children}
    </span>
  );
}
