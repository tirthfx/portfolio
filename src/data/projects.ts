// Lab projects. Text drafted from each repo's README (2026-11-08).
export interface Project {
  id: string;
  title: string;
  category: string;
  status: "Complete" | "In progress" | "Shipped";
  stack: string;
  year: string;
  /** Public repo URL. Private repos have none and show as private. */
  repo?: string;
  highlights: [string, string, string];
}

export const PROJECTS: Project[] = [
  {
    id: "gemma-redteam",
    title: "Red-Teaming Gemma 3",
    category: "AI safety research",
    status: "Complete",
    stack: "Python · PyTorch",
    year: "2026",
    repo: "https://github.com/tirthfx/gemma-jailbreak-redteam",
    highlights: [
      "Five attack classes on Gemma-3-4B, each measured with an attack success rate",
      "A defense that stops the strongest attack without hurting capability",
      "Run fully locally on Apple Silicon, no cloud GPU or API",
    ],
  },
  {
    id: "jcode-fusion",
    title: "jcode-fusion",
    category: "Coding-agent harness",
    status: "Shipped",
    stack: "Rust",
    year: "2026",
    repo: "https://github.com/tirthfx/jcode-fusion",
    highlights: [
      "Nine features ported from Codex Harness and Grok Build over five phases",
      "Guardian: a deny-only LLM judge for sandbox escalation requests",
      "Each sub-agent works in its own git worktree; merges are plain git",
    ],
  },
  {
    id: "agent-memory-failures",
    title: "Agent Memory Failures",
    category: "Agent research",
    status: "Complete",
    stack: "Python · Claude",
    year: "2026",
    highlights: [
      "Why coding agents fail on long tasks: a nine-category failure taxonomy",
      "100-run study comparing five context-compaction strategies",
      "Full history passed 20/20; truncation and retrieval 0/20",
    ],
  },
  {
    id: "edu-ai-moodle",
    title: "EDU-AI for Moodle",
    category: "AI for education",
    status: "In progress",
    stack: "Node · Postgres · PHP",
    year: "2026",
    highlights: [
      "AI tools inside the college's Moodle, delivered as LTI 1.3 tools",
      "Promi: students ask questions over the college's own notes",
      "Assessment Engine: plans question papers and grades scripts",
    ],
  },
  {
    id: "saffron-ide",
    title: "Saffron IDE",
    category: "Desktop app",
    status: "In progress",
    stack: "Rust · Tauri · TypeScript",
    year: "2026",
    highlights: [
      "A desktop IDE where AI agents write the code and you review the diffs",
      "Trajectory view of every model call, tool call and result",
      "Works end to end on macOS, with strict sandboxing of the webview",
    ],
  },
  {
    id: "e-cell",
    title: "E-Cell Website",
    category: "Website",
    status: "Shipped",
    stack: "Next.js · Tailwind",
    year: "2026",
    highlights: [
      "Site for the DYPSEM Entrepreneurship Cell",
      "Mobile-first, with a sticky pill nav and scroll-reveal sections",
      "Built on the club's own palette and approved copy",
    ],
  },
  {
    id: "eureka-26",
    title: "EUREKA '26",
    category: "Event site",
    status: "Shipped",
    stack: "Next.js · GSAP",
    year: "2026",
    highlights: [
      "Landing page for the RUNWAY Entrepreneurship Summit",
      "Scroll-driven collage hero and a pinned tracks sequence",
      "Applications go straight into a Google Sheet",
    ],
  },
];
