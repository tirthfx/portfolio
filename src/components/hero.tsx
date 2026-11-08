"use client";

import { useEffect, useState } from "react";
import ShapeHero, { type HeroShape } from "@/components/kokonutui/shape-hero";
import { cn } from "@/lib/utils";

const PILL = "h-14 px-7 font-medium text-lg tracking-tight";
// Palette: Paper / Stone / Coral / Black (dark mode keeps Kokonut's zinc pills)
const OUTLINE =
  "border border-[#D6CEBF] bg-[#E4DED2] text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";
const SOLID = "bg-black text-[#F6F4F1] dark:bg-[#F6F4F1] dark:text-black";
const ACCENT = "bg-[#F95C4B] text-white";

const pill = (id: string, content: string, look: string): HeroShape => ({ id, content, className: cn(PILL, look) });
const dot = (id: string, size: string, look: string): HeroShape => ({ id, className: cn(size, look) });

// Tirth's stack: languages, tools, and the models he works with.
const SHAPES: HeroShape[] = [
  pill("python", "Python", SOLID),
  pill("rust", "Rust", OUTLINE),
  dot("d1", "size-16", ACCENT),
  pill("typescript", "TypeScript", OUTLINE),
  pill("claude-fable", "Claude Fable", ACCENT),
  pill("swift", "Swift", OUTLINE),
  dot("d2", "size-12", SOLID),
  pill("kimi-k3", "Kimi K3", OUTLINE),
  pill("pytorch", "PyTorch", SOLID),
  dot("d3", "size-20", OUTLINE),
  pill("claude-code", "Claude Code", OUTLINE),
  pill("go", "Go", OUTLINE),
  pill("nextjs", "Next.js", SOLID),
  dot("d4", "size-14", OUTLINE),
  pill("mcp", "MCP", ACCENT),
  pill("hugging-face", "Hugging Face", OUTLINE),
  pill("ollama", "Ollama", SOLID),
  dot("d5", "size-12", ACCENT),
  pill("open-weights", "Open Weights", OUTLINE),
  pill("gemma", "Gemma", OUTLINE),
  dot("d6", "size-16", SOLID),
  pill("qwen", "Qwen", OUTLINE),
  pill("deepseek", "DeepSeek", SOLID),
  pill("glm", "GLM", OUTLINE),
  pill("react", "React", OUTLINE),
  dot("d7", "size-10", ACCENT),
  pill("tailwind", "Tailwind CSS", OUTLINE),
  pill("docker", "Docker", SOLID),
  pill("git", "Git", OUTLINE),
  dot("d8", "size-20", SOLID),
  pill("llm-safety", "LLM Safety", ACCENT),
  pill("agents", "Agents", OUTLINE),
  pill("cpp", "C++", OUTLINE),
  pill("sql", "SQL", SOLID),
  dot("d9", "size-12", OUTLINE),
  pill("aws", "AWS", OUTLINE),
  pill("cloudflare", "Cloudflare", OUTLINE),
  pill("supabase", "Supabase", SOLID),
  dot("d10", "size-14", ACCENT),
  pill("linux", "Linux", OUTLINE),
  pill("obsidian", "Obsidian", OUTLINE),
];

/** Shapes start falling when the loader clears, so a refresh shows the drop instead of a settled pile. */
export default function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { __loaderRevealed?: boolean };
    if (w.__loaderRevealed) { setReady(true); return; } // loader already done (client-side navigation)
    const go = () => setReady(true);
    window.addEventListener("loader:reveal", go, { once: true });
    return () => window.removeEventListener("loader:reveal", go);
  }, []);

  return (
    <ShapeHero
      key={ready ? "drop" : "wait"}
      as="h1"
      title={
        <span className="font-display text-6xl leading-[1.1] font-bold italic tracking-tight sm:text-8xl">
          Hi, I&apos;m Tirth
        </span>
      }
      description={
        <span className="block max-w-xl text-pretty text-lg text-ink-soft sm:text-xl">
          Software engineer building AI agents, dev tools, and breaking LLMs to make them safer.
        </span>
      }
      actions={null}
      shapes={ready ? SHAPES : []}
      // Room for the bigger pile (Kokonut's default is 0.3; extra shapes are dropped past this)
      fill={0.5}
      className="min-h-svh justify-center bg-transparent pt-0 pb-[22vh] text-ink dark:bg-transparent dark:text-ink"
    />
  );
}
