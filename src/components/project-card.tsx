"use client";

import CardFlip from "@/components/kokonutui/card-flip";
import type { Project } from "@/data/projects";

/** A Lab project as a ticket you can flip (Kokonut UI Card Flip). */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const no = String(index + 1).padStart(2, "0");
  return (
    <CardFlip
      label={project.title}
      className="w-[280px]"
      faceClassName="border-[#E4DED2] bg-[#FCFBF8] text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
      front={<Front project={project} no={no} />}
      back={<Back project={project} no={no} />}
    />
  );
}

const LABEL = "font-medium text-[11px] uppercase tracking-[0.14em] text-[#6B655C] dark:text-zinc-400";
const SMALL = "text-[11px] text-[#6B655C] dark:text-zinc-400";

function Front({ project, no }: { project: Project; no: string }) {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <span className={LABEL}>Lab {no}</span>
        <span className="rounded-md bg-[#F95C4B] px-1.5 py-0.5 font-medium text-[11px] text-white tracking-wide">
          {project.status}
        </span>
      </div>

      <div className="mt-6">
        <p className="font-medium text-[#E0402F] text-xs dark:text-[#F95C4B]">{project.category}</p>
        <h3 className="mt-1 font-display text-[28px] italic leading-[1.05] tracking-tight">{project.title}</h3>
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3">
        <div className="col-span-2">
          <dt className={SMALL}>Stack</dt>
          <dd className="font-medium text-sm">{project.stack}</dd>
        </div>
        <div>
          <dt className={SMALL}>Year</dt>
          <dd className="font-medium text-sm">{project.year}</dd>
        </div>
        <div>
          <dt className={SMALL}>Repo</dt>
          <dd className="font-medium text-sm">{project.repo ? "Public" : "Private"}</dd>
        </div>
      </dl>

      <div className="-mx-5 my-4 border-t border-dashed border-[#D6CEBF] dark:border-zinc-700" />

      <div className="flex items-end justify-between">
        <p className={SMALL}>Flip for details</p>
        <p className="font-mono text-xs tabular-nums text-[#6B655C] dark:text-zinc-400">No. {no}</p>
      </div>
    </div>
  );
}

function Back({ project, no }: { project: Project; no: string }) {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <span className={LABEL}>Highlights</span>
        <span className="font-mono text-xs tabular-nums text-[#6B655C] dark:text-zinc-400">#{no}</span>
      </div>

      <ul className="mt-5 space-y-3">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-[13px] leading-snug">
            <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#F95C4B]" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-[#E4DED2] pt-3 dark:border-zinc-800">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-black px-3.5 py-1.5 font-medium text-[#F6F4F1] text-xs transition-colors hover:bg-[#F95C4B] dark:bg-[#F6F4F1] dark:text-black dark:hover:bg-[#F95C4B] dark:hover:text-white"
          >
            View code <span aria-hidden>↗</span>
          </a>
        ) : (
          <p className={SMALL}>Private repo, details on request.</p>
        )}
      </div>
    </div>
  );
}
