"use client";

import Link from "next/link";
import CardFlip from "@/components/kokonutui/card-flip";
import type { Project } from "@/data/projects";

/** A big Lab card you can flip (Kokonut UI Card Flip). The arrow opens the project's full page. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <CardFlip
      label={project.title}
      className="aspect-[3/4] w-full sm:aspect-[5/4]"
      faceClassName="rounded-3xl border-[#E4DED2] bg-[#FCFBF8] text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
      front={<Front project={project} />}
      back={<Back project={project} />}
    />
  );
}

const MUTED = "text-[#6B655C] dark:text-zinc-400";

function Genres({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {project.genres.map((g) => (
        <span key={g} className="rounded-full border border-[#F95C4B]/40 px-2.5 py-0.5 font-medium text-[#E0402F] text-[11px] uppercase tracking-[0.12em] dark:text-[#F95C4B]">
          {g}
        </span>
      ))}
    </div>
  );
}

function ViewFull({ project }: { project: Project }) {
  return (
    <Link
      href={`/lab/${project.slug}/`}
      aria-label={`View full: ${project.title}`}
      className="grid size-10 place-items-center rounded-full bg-black text-[#F6F4F1] transition-colors hover:bg-[#F95C4B] dark:bg-[#F6F4F1] dark:text-black dark:hover:bg-[#F95C4B] dark:hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </Link>
  );
}

function Front({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <Genres project={project} />
        <span className="shrink-0 rounded-md bg-[#F95C4B] px-2 py-0.5 font-medium text-[11px] text-white tracking-wide">
          {project.status}
        </span>
      </div>

      <h3 className="mt-6 font-display text-3xl italic leading-[1.05] tracking-tight sm:text-4xl">{project.title}</h3>
      <p className={`mt-3 line-clamp-3 text-[15px] leading-relaxed ${MUTED}`}>{project.summary}</p>

      {/* Stats block, like the original ticket card */}
      <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-4 pt-5">
        <div className="col-span-2">
          <dt className={`text-xs ${MUTED}`}>Stack</dt>
          <dd className="mt-0.5 font-medium text-[15px]">{project.stack.slice(0, 3).join(" · ")}</dd>
        </div>
        <div>
          <dt className={`text-xs ${MUTED}`}>Started</dt>
          <dd className="mt-0.5 font-medium text-[15px]">{project.month}</dd>
        </div>
        <div>
          <dt className={`text-xs ${MUTED}`}>Repo</dt>
          <dd className="mt-0.5 font-medium text-[15px]">{project.repo ? "Public" : "Private"}</dd>
        </div>
      </dl>

      <div className="-mx-6 my-4 border-t border-dashed border-[#D6CEBF] sm:-mx-7 dark:border-zinc-700" />

      <div className="flex items-center justify-between">
        <p className={`text-xs ${MUTED}`}>Flip for highlights</p>
        <ViewFull project={project} />
      </div>
    </div>
  );
}

function Back({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className={`font-medium text-[11px] uppercase tracking-[0.14em] ${MUTED}`}>Highlights</span>
        <span className={`font-mono text-xs ${MUTED}`}>{project.month}</span>
      </div>

      <ul className="mt-6 space-y-4">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[15px] leading-snug">
            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#F95C4B]" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t border-[#E4DED2] pt-4 dark:border-zinc-800">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-1.5 font-medium text-xs transition-colors hover:border-[#F95C4B] hover:text-[#E0402F] dark:border-white/20"
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
