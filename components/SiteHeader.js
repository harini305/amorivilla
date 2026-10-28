"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, legacyAnchors } from "@/lib/content";

const SECTION_IDS = navItems.map((item) => item.id);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// In-page scrolling is handled here rather than with CSS scroll-behavior, which
// would also animate the browser's initial jump to a URL fragment and let it be
// interrupted. scroll-margin-top on sections keeps targets clear of the header.
export function scrollToSection(id, { push = true, smooth = true } = {}) {
  const element = document.getElementById(id);
  if (!element) return;
  // Anchors inside a section (e.g. #contact) bring the whole section into view
  // where its columns sit side by side; stacked, they go to the anchor itself.
  const sideBySide = window.matchMedia("(min-width: 64em)").matches;
  const target = (sideBySide && element.closest("section")) || element;
  const behavior = smooth && !prefersReducedMotion() ? "smooth" : "auto";
  target.scrollIntoView({ behavior, block: "start" });
  if (push && window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }
}

export default function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Header background and active section, measured against the header height.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setSolid(window.scrollY > 24);
      const header = document.querySelector(".site-header");
      const offset = (header ? header.offsetHeight : 0) + window.innerHeight * 0.3;
      let current = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? SECTION_IDS[SECTION_IDS.length - 1] : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Direct links: /#wellness lands on its section, and old WordPress anchors
  // (/#accomodation, /#galery, ...) are mapped to the new sections. The jump is
  // repeated once fonts are ready in case the font swap moved the target.
  useEffect(() => {
    const resolve = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const mapped = legacyAnchors[hash];
      if (mapped) window.history.replaceState(null, "", `#${mapped}`);
      const id = mapped || hash;
      return document.getElementById(id) ? id : null;
    };

    const initial = resolve();
    if (initial) {
      let userScrolled = false;
      const markUser = () => (userScrolled = true);
      const opts = { passive: true, once: true };
      window.addEventListener("wheel", markUser, opts);
      window.addEventListener("touchmove", markUser, opts);
      window.addEventListener("keydown", markUser, { once: true });
      scrollToSection(initial, { push: false, smooth: false });
      document.fonts?.ready.then(() => {
        if (!userScrolled) scrollToSection(initial, { push: false, smooth: false });
      });
    }

    const onHashChange = () => {
      const id = resolve();
      if (id) scrollToSection(id, { push: false });
    };
    // Any other in-page link (hero buttons, etc.) uses the same scrolling.
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link || event.defaultPrevented || link.classList.contains("skip-link")) return;
      const id = link.getAttribute("href").slice(1);
      if (!id || !document.getElementById(id)) return;
      event.preventDefault();
      scrollToSection(id);
    };
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: scroll lock, Escape to close, focus kept inside, closes at desktop width.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    panelRef.current?.querySelector("a")?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") close(true);
      if (event.key !== "Tab") return;
      const focusable = [toggleRef.current, ...panelRef.current.querySelectorAll("a")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64em)");
    const onDesktop = (event) => event.matches && close();

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  const onNavClick = (event, id) => {
    event.preventDefault();
    // Release the scroll lock before scrolling so the jump is not blocked.
    document.documentElement.classList.remove("menu-open");
    setOpen(false);
    scrollToSection(id);
  };

  const link = (id, label, className = "") => (
    <a
      href={`#${id}`}
      className={className}
      aria-current={active === id ? "true" : undefined}
      onClick={(event) => onNavClick(event, id)}
    >
      {label}
    </a>
  );

  return (
    <header className="site-header" data-solid={solid || open ? "true" : "false"}>
      <div className="site-header__inner">
        <a href="#top" className="site-header__logo" onClick={(event) => onNavClick(event, "top")}>
          <img src="/images/logo-white.webp" alt="Amori Villas, Luxury Ubud Retreat" width="440" height="251" className="logo logo--light" />
        </a>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>{link(item.id, item.label, "site-nav__link")}</li>
            ))}
          </ul>
          {link("contact", "Plan your stay", "button button--small site-nav__cta")}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle__label">{open ? "Close" : "Menu"}</span>
          <span className="menu-toggle__bars" aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>{link(item.id, item.label, "mobile-menu__link")}</li>
            ))}
            <li>{link("contact", "Plan your stay", "mobile-menu__link")}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
