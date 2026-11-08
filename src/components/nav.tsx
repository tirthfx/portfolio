"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LiquidCarveButton from "@/components/originkit/ui/liquid-carve-button";

// The carve reads colors as plain hex (not CSS variables), so pick them per theme.
const CARVE = {
  light: { fill: "#E4DED2", blob: "#F95C4B" },
  dark: { fill: "#18181B", blob: "#F95C4B" },
};

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return theme;
}
const LINKS = [
  { href: "/lab/", label: "Lab" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const carve = CARVE[useTheme()];
  const current = LINKS.find((l) => path.startsWith(l.href.slice(0, -1)));

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      {/* Whole bar is the Originkit liquid carve surface: a blob carves into it and chases the cursor */}
      <LiquidCarveButton
        colors={{ fill: carve.fill, textColor: "inherit" }}
        blob={{ size: 90, color: carve.blob, smoothness: 50 }}
        rounded={100}
        padding="0"
        className="w-full max-w-3xl rounded-full"
        // clip 2px so the blob layer never shows as a thin red ring around the bar
        style={{ cursor: "default", clipPath: "inset(2px round 9999px)" }}
      >
      <nav className="flex w-full items-center gap-3 py-2 pr-3 pl-2 sm:gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Home">
          <Image src="/portfolio/pfp.jpg" alt="Tirth" width={44} height={44} priority
            className="size-11 rounded-full border border-line object-cover" />
          <span className="hidden text-lg text-ink-soft sm:inline">
            / {current ? current.label.toLowerCase() : "home"}
          </span>
        </Link>

        <ul className="ml-auto flex items-center gap-0.5 overflow-x-auto rounded-full border border-line p-1 [scrollbar-width:none] sm:gap-1">
          {LINKS.map((l) => {
            const active = current?.href === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href}
                  className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 sm:text-[15px] ${
                    active ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button type="button" aria-label="Search" className="grid size-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:text-ink">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </button>
        <button type="button" onClick={toggleTheme} aria-label="Switch theme" className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink">
          <svg viewBox="0 0 24 24" className="size-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          <svg viewBox="0 0 24 24" className="hidden size-4 dark:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
      </nav>
      </LiquidCarveButton>
    </header>
  );
}
