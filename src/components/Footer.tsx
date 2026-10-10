"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";

const objectPositions: Record<number, string> = {
  1: "15% center",
  2: "85% center",
  19: "center 15%",
  26: "center 20%",
  32: "center 12%",
};

const galleryImages = Array.from({ length: 33 }, (_, i) => ({
  src: `/images/gallery/gallery-${i + 1}.jpg`,
  objectPosition: objectPositions[i + 1],
}));

const AUTO_SCROLL_PX_PER_SECOND = 70;
const MANUAL_HOLD_MS = 3500;

export default function Footer() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const holdUntil = useRef(0);
  // Desktop only: the gallery drifts on its own and loops seamlessly (two copies of the strip).
  const [auto, setAuto] = useState(false);

  const scroll = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    holdUntil.current = Date.now() + MANUAL_HOLD_MS;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 821px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAuto(desktop.matches && !reduceMotion.matches);
    update();
    desktop.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const gallery = track?.parentElement;
    if (!auto || !track || !gallery) return;

    let frame = 0;
    let last = 0;
    let pos = track.scrollLeft;
    let wasPaused = false;
    let inView = false;

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(gallery);

    const hold = () => {
      holdUntil.current = Date.now() + MANUAL_HOLD_MS;
    };
    const enter = () => {
      hovered.current = true;
    };
    const leave = () => {
      hovered.current = false;
    };
    gallery.addEventListener("mouseenter", enter);
    gallery.addEventListener("mouseleave", leave);
    track.addEventListener("wheel", hold, { passive: true });
    track.addEventListener("pointerdown", hold);

    // Distance from the first slide to the first slide of the second copy.
    const period = () => {
      const copy = track.children[galleryImages.length] as
        HTMLElement | undefined;
      const first = track.children[0] as HTMLElement | undefined;
      return copy && first ? copy.offsetLeft - first.offsetLeft : 0;
    };

    const tick = (time: number) => {
      const paused =
        hovered.current || Date.now() < holdUntil.current || !inView;
      if (last && !paused) {
        if (wasPaused) pos = track.scrollLeft;
        pos += (AUTO_SCROLL_PX_PER_SECOND * Math.min(time - last, 100)) / 1000;
        const loop = period();
        if (loop && pos >= loop) pos -= loop;
        track.scrollLeft = pos;
      }
      wasPaused = paused;
      last = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gallery.removeEventListener("mouseenter", enter);
      gallery.removeEventListener("mouseleave", leave);
      track.removeEventListener("wheel", hold);
      track.removeEventListener("pointerdown", hold);
    };
  }, [auto]);

  const slides = auto ? [...galleryImages, ...galleryImages] : galleryImages;

  return (
    <footer className={styles.footer}>
      <div className={styles.gallery}>
        <button
          className={`${styles.arrow} ${styles.prev}`}
          onClick={() => scroll(-1)}
          aria-label="Scroll gallery left"
        >
          ←
        </button>
        <div className={styles.track} ref={trackRef} data-auto={auto}>
          {slides.map((item, index) => {
            const copy = index >= galleryImages.length;
            return (
              <div
                className={styles.slide}
                key={`${item.src}-${copy ? "b" : "a"}`}
                aria-hidden={copy || undefined}
              >
                <Image
                  src={item.src}
                  alt={
                    copy ? "" : "Edwin performing close-up mentalism for guests"
                  }
                  fill
                  className={styles.image}
                  sizes="(max-width: 820px) 65vw, 33vw"
                  style={
                    item.objectPosition
                      ? { objectPosition: item.objectPosition }
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
        <button
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => scroll(1)}
          aria-label="Scroll gallery right"
        >
          →
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.contact}>
          <a href="mailto:enquiries@themodernmentalist.com">
            enquiries@themodernmentalist.com
          </a>
          <a href="tel:+447359342640">+44 7359 342640</a>
        </div>
        <div className={styles.social}>
          <a
            href="https://www.instagram.com/themodernmentalist/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            Instagram
          </a>
          <a
            href="https://uk.linkedin.com/in/edwin-todd-the-modern-mentalist-7a9511154"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
              <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
              <circle
                cx="7.5"
                cy="7"
                r="0.75"
                fill="currentColor"
                stroke="none"
              />
              <path d="M11.5 16.5v-3.7c0-1.4 1-2.3 2.3-2.3 1.3 0 2.2.9 2.2 2.3v3.7" />
              <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>The Modern Mentalist © {new Date().getFullYear()}</span>
        <Link href="/blog" className={styles.blogLink}>
          Blog
        </Link>
        <span>London &amp; Worldwide</span>
      </div>
    </footer>
  );
}
