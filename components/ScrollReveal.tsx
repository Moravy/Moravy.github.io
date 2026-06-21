"use client";

import { useEffect } from "react";

// Adds `reveal-on` to <html> (so CSS only hides content once JS is present —
// no-JS users still see everything), then reveals each [data-reveal] element as
// it scrolls into view. Elements already on screen are revealed with no flash.
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    document.documentElement.classList.add("reveal-on");

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.setAttribute("data-inview", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-inview", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.setAttribute("data-inview", ""); // already visible
      else io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
