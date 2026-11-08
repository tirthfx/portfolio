// Lab projects. All text comes from each project's own README (2026-11-08); Tirth reviews it.
// Structure follows the vault note "Project Page Model".

export interface Table {
  head: string[];
  rows: string[][];
  caption?: string;
}

export interface Section {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: Table;
}

export interface Project {
  slug: string;
  title: string;
  /** One or two sentences: what it is and what it does. */
  summary: string;
  /** Genre chips, e.g. Research, Dev tool, Open source. */
  genres: string[];
  /** Month it started, e.g. "Sep 2026". */
  month: string;
  status: "Complete" | "In progress" | "Paused" | "Shipped";
  stack: string[];
  tags: string[];
  /** Public repo URL. Private repos have none. */
  repo?: string;
  /** Three short points for the back of the Lab card. */
  highlights: [string, string, string];
  /** One headline number for the card front. */
  stat: { value: string; label: string };
  /** What comes next, for the card back. */
  next: string;
  /** What the status card says. */
  statusNote: string;
  sections: Section[];
  related: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "gemma-redteam",
    title: "Red-Teaming Gemma 3",
    summary:
      "An attack-and-defense red-teaming study of Google's open-weight Gemma-3-4B-it: five attack classes, each measured with an attack success rate, plus defenses, all run locally on Apple Silicon.",
    genres: ["Research", "AI safety", "Open source"],
    month: "Sep 2026",
    status: "Complete",
    stack: ["Python", "PyTorch (MPS)", "Hugging Face Transformers", "Gemma-3-4B-it"],
    tags: ["red-teaming", "jailbreaks", "refusal-direction", "gcg", "llm-safety", "open-weights"],
    repo: "https://github.com/tirthfx/gemma-jailbreak-redteam",
    highlights: [
      "Five attack classes, each measured with an attack success rate",
      "Refusal re-fusion defense brings ablation ASR from 95% back to 15%",
      "Run fully locally on Apple Silicon, no cloud GPU or API",
    ],
    stat: { value: "84.8%", label: "attack success with prefix injection, the strongest black-box jailbreak" },
    next: "A held-out split for the refusal direction, then replication on a second open-weight model",
    statusNote: "Complete. Full technical write-up and a non-technical blog post are in the repo.",
    sections: [
      {
        heading: "Why I made it",
        paragraphs: [
          "Safety-tuned language models are trained to refuse harmful requests. Red-teaming measures how robust that training is, and whether defenses still hold once an attack is known.",
          "The framing is AI-safety research. The target is a model run locally; no production system or third-party service was tested.",
        ],
      },
      {
        heading: "What the study does",
        bullets: [
          "Builds a small, self-authored benchmark of harmful-request categories and an automated judge",
          "Measures the stock model's baseline attack success rate (ASR) with no attack applied",
          "Implements five attack classes: prompt-based jailbreaks, self-play automated search, GCG gradient-based suffixes, refusal-direction ablation, and multimodal (image-channel) injection",
          "Checks capability retention for every intervention, to tell an edit that targets refusal from one that just breaks the model",
          "Builds two defenses: a perplexity filter for optimized suffixes and an activation-steering \"refusal re-fusion\" guardrail",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Most attack conditions ran on 8 or 20 prompts, so one prompt moves a result by 5 to 12.5 points. Treat every number as indicative.",
        ],
        table: {
          head: ["Result", "Value", "Sample"],
          rows: [
            ["Baseline ASR, no attack", "13.0%", "46 prompts"],
            ["Prefix injection (strongest black-box)", "84.8%", "46 prompts"],
            ["Roleplay", "41.3%", "46 prompts"],
            ["Self-play, after 3 rounds", "100%", "8 prompts"],
            ["Refusal-direction ablation, α = 0.05", "95%", "20 prompts"],
            ["Re-fusion guardrail on the ablated model", "15%", "20 prompts"],
            ["QA accuracy, ablated and defended model", "80%", "10 items"],
            ["Multimodal, image vs text channel", "25.0% vs 12.5%", "8 prompts"],
            ["GCG suffix", "Did not converge", "2 runs"],
          ],
          caption: "Attack success rate (ASR): share of harmful prompts the judge marked as complied with.",
        },
      },
      {
        heading: "Ablation strength sweep",
        paragraphs: [
          "Removing the refusal direction with strength α gives a sharp, non-monotonic curve, not a smooth trade-off. From α = 0.3 upward the outputs degenerate, so those rows measure neither refusal nor compliance.",
        ],
        table: {
          head: ["α", "ASR", "QA accuracy", "Non-answers"],
          rows: [
            ["0.0 (no edit)", "15%", "80%", "0%"],
            ["0.05", "95%", "80%", "0%"],
            ["0.1", "95%", "70%", "5%"],
            ["0.2", "80%", "80%", "20%"],
            ["0.3", "40%", "60%", "60%"],
            ["0.5", "0%", "0%", "100%"],
          ],
        },
      },
      {
        heading: "Limitations",
        bullets: [
          "Small samples: most attack conditions use 8 or 20 prompts, so intervals are wide",
          "The ablation and defense subsets cover three of eight categories",
          "The judge is rule-based and was spot-checked, not fully hand-labelled",
          "The perplexity filter's calibration is circular, and no working GCG suffix was available to test it",
          "One model, one device, one precision, greedy decoding",
        ],
      },
      {
        heading: "What's next",
        bullets: [
          "A held-out split for the refusal direction, separate from every evaluation prompt",
          "Full-benchmark ablation and a layer-by-layer sweep",
          "A human-labelled audit of the judge",
          "A real adversarial suffix to test the perplexity filter",
          "Replication on a second open-weight model",
        ],
      },
    ],
    related: ["agent-memory-failures", "jcode-fusion"],
  },
  {
    slug: "jcode-fusion",
    title: "jcode-fusion",
    summary:
      "A hard fork of the jcode coding-agent harness that ports nine orchestration, safety and swarm features from OpenAI's Codex Harness and xAI's Grok Build, across five phases.",
    genres: ["Dev tool", "Open source", "Agents"],
    month: "Aug 2026",
    status: "Paused",
    stack: ["Rust", "Starlark", "macOS Seatbelt", "Agent Client Protocol", "MCP"],
    tags: ["coding-agents", "harness", "sandboxing", "swarms", "acp", "rust"],
    repo: "https://github.com/tirthfx/jcode-fusion",
    highlights: [
      "Nine features ported from Codex Harness and Grok Build over five phases",
      "Guardian: a deny-only LLM judge for sandbox escalation requests",
      "Each sub-agent works in its own git worktree; merges are plain git",
    ],
    stat: { value: "9", label: "features ported from Codex Harness and Grok Build, across 5 phases" },
    next: "Fix the open 429 on the Antigravity provider, then pick the build back up",
    statusNote: "All five phases are complete and tested. Paused, not abandoned: the build docs explain how to pick it back up.",
    sections: [
      {
        heading: "Why I made it",
        paragraphs: [
          "jcode was picked as the base over Codex Harness and Grok Build for one reason: multi-provider, multi-account sign-in. Both alternatives are single-vendor tools tied to their own subscriptions.",
          "On top of that base, the fork reimplements the best ideas from the other two in jcode-style Rust. Nothing is copy-pasted (jcode is MIT, both donors are Apache-2.0).",
        ],
      },
      {
        heading: "What shipped",
        table: {
          head: ["Phase", "Feature", "What it does"],
          rows: [
            ["0 · Foundation", "Mission Engine", "Budget-aware state machine; an agent can never grade its own \"done\", a separate verifier must confirm"],
            ["0 · Foundation", "Provable-safe rewind", "Rewind checkpoints that refuse to guess after compaction"],
            ["1 · Safety", "Guardian", "LLM-as-judge for sandbox-escalation requests; deny-only, fails closed"],
            ["1 · Safety", "Layered OS sandboxing", "Whole-process macOS Seatbelt sandboxing"],
            ["1 · Safety", "Execpolicy in Starlark", "Command classification layered on the existing risk classifier, never downgrading it"],
            ["2 · Swarms", "Worktree per sub-agent", "Each agent gets its own git worktree; conflicts resolve with git merge"],
            ["3 · Ecosystem", "Agent Client Protocol", "Session lifecycle, session-scoped MCP servers, client callbacks"],
            ["3 · Ecosystem", "Orchestration as script", "Saved, replayable, parameterised multi-agent task graphs"],
            ["4 · Memory", "Two-phase consolidation", "Background extraction jobs per session, then a locked consolidator writing MEMORY.md"],
          ],
        },
      },
      {
        heading: "How quality was kept",
        paragraphs: [
          "Two full-repo AI code scans surfaced 54 findings. Every one was triaged: fixed, confirmed as pre-existing, or deliberately deferred. Real bugs were caught before shipping, including a cross-session callback forgery.",
        ],
      },
      {
        heading: "Build docs",
        bullets: [
          "DESIGN.md: why jcode was the base, what was ported from where, and why",
          "PROGRESS.md: the phase-by-phase build log",
          "Session narratives and a final summary of the whole build",
        ],
      },
      {
        heading: "Credits",
        bullets: [
          "1jehuang/jcode: the base harness (MIT)",
          "openai/codex (Codex Harness): Guardian, OS sandboxing, execpolicy, memory consolidation (Apache-2.0)",
          "xai-org/grok-build: rewind, ACP support, orchestration as script (Apache-2.0)",
        ],
      },
    ],
    related: ["saffron-ide", "agent-memory-failures"],
  },
  {
    slug: "agent-memory-failures",
    title: "Agent Memory Failures",
    summary:
      "Why coding agents fail on long tasks: a nine-category failure taxonomy, and a 100-run study comparing five ways of compacting an agent's context.",
    genres: ["Research", "Agents"],
    month: "Nov 2026",
    status: "Complete",
    stack: ["Python", "Claude Haiku", "Claude Code CLI"],
    tags: ["coding-agents", "context-compaction", "long-horizon", "evaluation", "failure-taxonomy"],
    highlights: [
      "A nine-category taxonomy of how coding agents fail on long tasks",
      "100-run study of five context-compaction strategies",
      "Full history passed 20/20; truncation and retrieval 0/20",
    ],
    stat: { value: "100", label: "runs comparing 5 context-compaction strategies, about 8k model calls" },
    next: "Settle whether pass rate falls as tasks get longer",
    statusNote: "Complete. The 100-run main experiment is finished and analysed; the repo is private.",
    sections: [
      {
        heading: "Why I made it",
        paragraphs: [
          "Coding agents that run for many steps forget constraints, repeat actions and act on stale file state. This project asks which of those failures come from lost context, and which way of compacting context loses the least.",
        ],
      },
      {
        heading: "Research questions",
        bullets: [
          "What are the most common failure modes in long coding-agent runs, and how often does each happen?",
          "Which failures come from lost context: forgotten constraints, repeated actions, stale file state?",
          "Among truncation, rolling summary, retrieval and structured notes, which cuts context-loss failures most, and at what cost?",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "Mining: aggregate failure statistics from 509 real agent sessions (no raw text stored)",
          "Taxonomy: nine categories in two families, context loss and non-context failures",
          "Harness: each turn is one Claude Haiku call with a context built by the memory strategy",
          "Tasks: synthetic multi-file coding tasks with three planted rules each",
          "Design: 10 tasks × 2 seeds × 5 strategies, 25 steps, a 600-token budget: 100 runs, about 8k model calls",
        ],
      },
      {
        heading: "Results",
        table: {
          head: ["Strategy", "Passed", "95% CI"],
          rows: [
            ["Full history (control)", "20/20", "84–100%"],
            ["Rolling summary", "15/20", "53–89%"],
            ["Structured notes", "13/20", "43–82%"],
            ["Truncation", "0/20", "0–16%"],
            ["Retrieval", "0/20", "0–16%"],
          ],
        },
        paragraphs: [
          "Summary and notes both clearly beat truncation. Notes did not beat summary, so that prediction failed. Summary also cost the most model calls per run.",
        ],
      },
      {
        heading: "Limitations",
        bullets: [
          "Synthetic tasks, one model (Haiku), one length and one context budget",
          "Failure labels are rule-based, not human-validated",
          "A follow-up sweep could not settle whether pass rate falls as tasks get longer",
        ],
      },
    ],
    related: ["jcode-fusion", "gemma-redteam"],
  },
  {
    slug: "edu-ai-moodle",
    title: "EDU-AI for Moodle",
    summary:
      "AI academic-improvement tools for DYPSEM Kolhapur, delivered inside the college's Moodle as LTI 1.3 tools: student Q&A over the college's own notes, and an assessment engine.",
    genres: ["Product", "AI for education"],
    month: "Oct 2026",
    status: "In progress",
    stack: ["Node", "Postgres + pgvector", "PHP", "Moodle 5.2", "LTI 1.3", "Docker"],
    tags: ["edtech", "moodle", "lti", "rag", "assessment"],
    highlights: [
      "AI tools inside the college's Moodle, delivered as LTI 1.3 tools",
      "Promi: students ask questions over the college's own notes",
      "Assessment Engine: plans question papers and grades scripts",
    ],
    stat: { value: "LTI 1.3", label: "AI tools delivered inside the college's own Moodle" },
    next: "A teacher page for grading scripts",
    statusNote: "In progress. The local Moodle sandbox and the backend are built and tested; the repo is private.",
    sections: [
      {
        heading: "Why I made it",
        paragraphs: [
          "Students and teachers already live in the college's Moodle. Instead of another app to log into, EDU-AI brings its tools into Moodle itself, through the LTI 1.3 standard. It succeeds an earlier standalone version.",
        ],
      },
      {
        heading: "What it includes",
        bullets: [
          "Promi: student Q&A over the college's own notes",
          "Assessment Engine: a concept planner, subject profiles, a paper-quality pass, whole-paper generation and grading of scripts",
          "LTI 1.3 launch, the college roster, and linking a Moodle user to their record",
        ],
      },
      {
        heading: "How it fits together",
        table: {
          head: ["Part", "What it is"],
          rows: [
            ["sandbox/", "A local Moodle 5.2 in Docker, seeded with a course, a teacher and two students"],
            ["backend/", "The EDU-AI backend: Node with Postgres and pgvector, health checks, migrations and the LTI launch"],
            ["vault/", "Project notes in an Obsidian vault"],
            [".devcontainer/", "A Codespaces dev container with Docker-in-Docker and the OCR tools"],
          ],
        },
      },
      {
        heading: "How it's built",
        bullets: [
          "Every PR is reviewed by a fast AI review pass, a second model review, and CI before it merges",
          "No secrets in PRs; CI checks for obvious ones",
        ],
      },
    ],
    related: ["saffron-ide", "agent-memory-failures"],
  },
  {
    slug: "saffron-ide",
    title: "Saffron IDE",
    summary:
      "A desktop coding IDE where AI agents do the work and you review the diffs. Tauri and Monaco on top of an unmodified DeepSeek-Harness engine.",
    genres: ["Dev tool", "Desktop app", "Agents"],
    month: "Oct 2026",
    status: "In progress",
    stack: ["Rust", "Tauri", "TypeScript", "Monaco", "DeepSeek Harness", "ACP"],
    tags: ["ide", "coding-agents", "tauri", "desktop", "diff-review"],
    highlights: [
      "A desktop IDE where AI agents write the code and you review the diffs",
      "Trajectory view of every model call, tool call and result",
      "Works end to end on macOS, with strict sandboxing of the webview",
    ],
    stat: { value: "3", label: "providers you can sign in with: DeepSeek, Claude and Grok" },
    next: "A swarm view of parallel agents, each in its own worktree lane",
    statusNote: "Working end to end on macOS (roadmap phases 0–8). The repo is private.",
    sections: [
      {
        heading: "What works",
        table: {
          head: ["Feature", "What it does"],
          rows: [
            ["Chat", "Streaming reasoning, tool activity, markdown answers, model and effort pickers, approval prompts; light and dark"],
            ["Providers", "Sign in with a DeepSeek API key, a Claude subscription or a Grok subscription; secrets stay in the engine's own store"],
            ["Trajectory", "Every model call, reasoning block, tool call and result, with a lane chart, filters and search"],
            ["Stats", "Time to first token, tokens per second, cache hits and an estimated context split"],
            ["Files and review", "Workspace file tree, tabs, and a Monaco diff with Accept / Reject after each agent turn"],
            ["Past chats", "A sidebar of sessions you can resume"],
          ],
        },
      },
      {
        heading: "How it fits together",
        bullets: [
          "Tauri (Rust) shell with a TypeScript and Monaco UI",
          "The DeepSeek Harness engine runs unmodified as a sidecar, spoken to over ACP on stdio",
          "A small bridge plugin streams events, auth and raw captures back over a local socket",
        ],
      },
      {
        heading: "Security",
        bullets: [
          "Strict content security policy and no global Tauri object",
          "An allowlist for every command the webview can send to the engine",
          "File access confined to the open workspace; no innerHTML anywhere, enforced by a test",
          "Raw payload capture is off by default and redacts secrets",
        ],
      },
      {
        heading: "Not built yet",
        bullets: [
          "An Antigravity provider",
          "A swarm view of parallel agents in worktree lanes",
          "A bundled, distributable build",
        ],
      },
    ],
    related: ["jcode-fusion", "edu-ai-moodle"],
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
