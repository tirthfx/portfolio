"use client";

import Link from "next/link";
import CardFlip from "@/components/kokonutui/card-flip";
import type { Project } from "@/data/projects";

/** A big Lab card you can flip (Kokonut UI Card Flip). "View full" opens the project's own page. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <CardFlip
      label={project.title}
      className="aspect-[3/5] w-full sm:aspect-[6/7]"
      faceClassName="rounded-3xl border-[#E4DED2] bg-[#FCFBF8] text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
      front={<Front project={project} />}
      back={<Back project={project} />}
    />
  );
}

const MUTED = "text-[#6B655C] dark:text-zinc-400";
const LABEL = `font-medium text-[11px] uppercase tracking-[0.14em] ${MUTED}`;

function ViewFull({ project }: { project: Project }) {
  return (
    <Link
      href={`/lab/${project.slug}/`}
      aria-label={`View full: ${project.title}`}
      className="group inline-flex items-center gap-2 rounded-full bg-black py-2 pr-2 pl-4 font-medium text-[#F6F4F1] text-sm transition-colors hover:bg-[#F95C4B] dark:bg-[#F6F4F1] dark:text-black dark:hover:bg-[#F95C4B] dark:hover:text-white"
    >
      View full
      <span className="grid size-6 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:bg-black/10">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </Link>
  );
}

function Front({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.genres.map((g) => (
            <span key={g} className="rounded-full border border-[#F95C4B]/40 px-2.5 py-0.5 font-medium text-[#E0402F] text-[11px] uppercase tracking-[0.12em] dark:text-[#F95C4B]">
              {g}
            </span>
          ))}
        </div>
        <span className="shrink-0 rounded-md bg-[#F95C4B] px-2 py-0.5 font-medium text-[11px] text-white tracking-wide">
          {project.status}
        </span>
      </div>

      <h3 className="mt-6 font-display text-4xl italic leading-[1.02] tracking-tight sm:text-[44px]">{project.title}</h3>
      <p className={`mt-3 line-clamp-3 text-[15px] leading-relaxed ${MUTED}`}>{project.summary}</p>

      {/* Headline number */}
      <div className="mt-6 flex items-baseline gap-4 rounded-2xl bg-[#F1ECE3] px-5 py-4 dark:bg-zinc-800/60">
        <span className="shrink-0 font-display text-4xl italic leading-none tracking-tight text-[#E0402F] dark:text-[#F95C4B]">
          {project.stat.value}
        </span>
        <span className={`text-sm leading-snug ${MUTED}`}>{project.stat.label}</span>
      </div>

      {/* Stats block, like the original ticket card */}
      <dl className="mt-auto grid grid-cols-3 gap-x-6 gap-y-4 pt-6">
        <div className="col-span-3">
          <dt className={`text-xs ${MUTED}`}>Stack</dt>
          <dd className="mt-0.5 font-medium text-[15px]">{project.stack.slice(0, 4).join(" · ")}</dd>
        </div>
        <div>
          <dt className={`text-xs ${MUTED}`}>Started</dt>
          <dd className="mt-0.5 font-medium text-[15px]">{project.month}</dd>
        </div>
        <div>
          <dt className={`text-xs ${MUTED}`}>Status</dt>
          <dd className="mt-0.5 font-medium text-[15px]">{project.status}</dd>
        </div>
        <div>
          <dt className={`text-xs ${MUTED}`}>Repo</dt>
          <dd className="mt-0.5 font-medium text-[15px]">{project.repo ? "Public" : "Private"}</dd>
        </div>
      </dl>

      <div className="-mx-6 my-5 border-t border-dashed border-[#D6CEBF] sm:-mx-8 dark:border-zinc-700" />

      <div className="flex items-center justify-between">
        <p className={`text-xs ${MUTED}`}>Flip for highlights</p>
        <ViewFull project={project} />
      </div>
    </div>
  );
}

function Back({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className={LABEL}>Highlights</span>
        <span className={`font-mono text-xs ${MUTED}`}>{project.month}</span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[15px] leading-snug">
            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#F95C4B]" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <span className={LABEL}>Next up</span>
        <p className="mt-2 text-[15px] leading-snug">{project.next}</p>
      </div>

      <div className="mt-7">
        <span className={LABEL}>Built with</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-[#E4DED2] px-2.5 py-1 text-xs dark:border-zinc-700">{s}</span>
          ))}
        </div>
      </div>

      <p className={`mt-4 text-xs ${MUTED}`}>{project.tags.map((t) => `#${t}`).join("  ")}</p>

      <div className="mt-auto flex items-center justify-between border-t border-[#E4DED2] pt-5 dark:border-zinc-800">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-2 font-medium text-sm transition-colors hover:border-[#F95C4B] hover:text-[#E0402F] dark:border-white/20"
          >
            View code <span aria-hidden>↗</span>
          </a>
        ) : (
          <p className={`text-xs ${MUTED}`}>Private repo, details on request.</p>
        )}
        <ViewFull project={project} />
      </div>
    </div>
  );
}
