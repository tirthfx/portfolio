import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/components/copy-link";
import { PROJECTS, projectBySlug, type Section } from "@/data/projects";

// Static export: one page per project, built ahead of time.
export const dynamicParams = false;
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  return p ? { title: `${p.title} · Tirth`, description: p.summary } : {};
}

const MUTED = "text-[#6B655C] dark:text-zinc-400";
const CHIP = "rounded-full border border-[#E4DED2] px-3 py-1 text-sm dark:border-zinc-800";

export default async function ProjectPage({ params }: Props) {
  const project = projectBySlug((await params).slug);
  if (!project) notFound();
  const related = project.related.map(projectBySlug).filter((p) => p !== undefined);

  return (
    <main className="min-h-svh px-4 pt-32 pb-24">
      <article className="mx-auto max-w-3xl">
        {/* Header */}
        <Link href="/lab/" className={`font-medium text-xs uppercase tracking-[0.14em] hover:text-[#E0402F] ${MUTED}`}>
          ← All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {project.genres.map((g) => (
            <span key={g} className="rounded-full border border-[#F95C4B]/40 px-3 py-1 font-medium text-[#E0402F] text-xs uppercase tracking-[0.12em] dark:text-[#F95C4B]">
              {g}
            </span>
          ))}
        </div>

        <h1 className="mt-5 font-display text-5xl italic leading-[1.02] tracking-tight sm:text-7xl">{project.title}</h1>
        <p className={`mt-6 text-lg leading-relaxed sm:text-xl ${MUTED}`}>{project.summary}</p>

        <p className={`mt-8 font-mono text-sm ${MUTED}`}>
          {project.month} · {project.status}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={`mr-1 font-medium text-xs uppercase tracking-[0.14em] ${MUTED}`}>Built with</span>
          {project.stack.map((s) => (
            <span key={s} className={CHIP}>{s}</span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className={`text-sm ${MUTED}`}>#{t}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 font-medium text-[#F6F4F1] text-sm transition-colors hover:bg-[#F95C4B] dark:bg-[#F6F4F1] dark:text-black dark:hover:bg-[#F95C4B] dark:hover:text-white"
            >
              View source <span aria-hidden>↗</span>
            </a>
          )}
          <CopyLink />
        </div>

        {/* Status card */}
        <div className="mt-12 rounded-3xl border border-[#E4DED2] bg-[#FCFBF8] p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className={`font-medium text-xs uppercase tracking-[0.14em] ${MUTED}`}>Status</span>
            <span className="rounded-md bg-[#F95C4B] px-2 py-0.5 font-medium text-white text-xs">{project.status}</span>
          </div>
          <p className="mt-3 leading-relaxed">{project.statusNote}</p>
        </div>

        {/* Body */}
        <div className="mt-16 space-y-14">
          {project.sections.map((s) => (
            <SectionBlock key={s.heading} section={s} />
          ))}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-[#E4DED2] pt-10 dark:border-zinc-800">
            <h2 className="font-display text-3xl italic tracking-tight">Related projects</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/lab/${r.slug}/`}
                  className="group rounded-3xl border border-[#E4DED2] bg-[#FCFBF8] p-5 transition-colors hover:border-[#F95C4B] dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="font-medium text-[#E0402F] text-[11px] uppercase tracking-[0.12em] dark:text-[#F95C4B]">{r.genres.join(" · ")}</p>
                  <p className="mt-2 font-display text-2xl italic leading-tight">{r.title}</p>
                  <p className={`mt-2 line-clamp-2 text-sm ${MUTED}`}>{r.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <section>
      <h2 className="border-b border-[#E4DED2] pb-3 font-display text-3xl italic tracking-tight dark:border-zinc-800">{section.heading}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="mt-5 leading-relaxed text-[17px]">{p}</p>
      ))}
      {section.bullets && (
        <ul className="mt-5 space-y-3">
          {section.bullets.map((b) => (
            <li key={b} className="flex gap-3 leading-relaxed text-[17px]">
              <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-[#F95C4B]" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <figure className="mt-6">
          <div className="overflow-x-auto rounded-2xl border border-[#E4DED2] dark:border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#EFEBE4] dark:bg-zinc-900">
                <tr>
                  {section.table.head.map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row) => (
                  <tr key={row.join("|")} className="border-t border-[#E4DED2] dark:border-zinc-800">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-4 py-3 align-top ${i === 0 ? "font-medium" : MUTED}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.table.caption && <figcaption className={`mt-3 text-center text-sm ${MUTED}`}>{section.table.caption}</figcaption>}
        </figure>
      )}
    </section>
  );
}
