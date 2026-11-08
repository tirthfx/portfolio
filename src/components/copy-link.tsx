"use client";

import { useState } from "react";

/** Copies the current page URL. */
export default function CopyLink() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2 font-medium text-sm transition-colors hover:border-[#F95C4B] dark:border-white/20"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
