"use client";

import { useEffect } from "react";

// Publishes the footer's real height as --footer-actual, so the last section
// can take exactly the rest of the screen and the two land together on a nav jump.
export default function FooterFit() {
  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--footer-actual", `${footer.offsetHeight}px`);
    const observer = new ResizeObserver(update);
    observer.observe(footer);
    update();
    return () => {
      observer.disconnect();
      root.style.removeProperty("--footer-actual");
    };
  }, []);

  return null;
}
