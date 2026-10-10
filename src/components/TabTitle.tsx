"use client";

import { useEffect } from "react";

export default function TabTitle() {
  useEffect(() => {
    let original = "";
    let timer: number | undefined;

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.clearTimeout(timer);
        original = original || document.title;
        document.title = "Leaving already? I knew you would.";
      } else {
        document.title = "Knew you’d be back ✦";
        timer = window.setTimeout(() => {
          document.title = original;
          original = "";
        }, 2500);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
