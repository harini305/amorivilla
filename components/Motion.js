"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll-linked entrances. Content is fully visible without JavaScript; only
// elements that start below the fold are animated, so nothing in the first
// viewport flickers on hydration. Disabled for prefers-reduced-motion.
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const belowFold = (el) => el.getBoundingClientRect().top > window.innerHeight;

      gsap.utils.toArray("[data-reveal]").filter(belowFold).forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Images settle from a slight zoom inside their fixed-ratio frames.
      gsap.utils.toArray("[data-reveal-image]").filter(belowFold).forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        gsap.from(img, {
          scale: 1.08,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 90%", once: true },
        });
      });
    });

    // Lazy images and font swaps can change section heights after first measure.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
