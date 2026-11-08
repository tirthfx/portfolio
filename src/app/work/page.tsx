import type { Metadata } from "next";
import { ROLES } from "@/data/work";

export const metadata: Metadata = { title: "Work · Tirth" };

const MUTED = "text-[#6B655C] dark:text-zinc-400";
const LABEL = `font-medium text-[11px] uppercase tracking-[0.14em] ${MUTED}`;
const CARD = "rounded-3xl border border-[#E4DED2] bg-[#FCFBF8] dark:border-zinc-800 dark:bg-zinc-900";

export default function WorkPage() {
  return (
    <main className="min-h-svh px-4 pt-32 pb-24">
      <div className="mx-auto max-w-6xl space-y-16">
        {ROLES.map((r) => (
          <section key={r.company}>
            {/* Role header */}
            <div className={`${CARD} p-7 sm:p-10`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className={LABEL}>{r.period} · {r.location}</p>
                  <h1 className="mt-3 font-display text-5xl italic leading-[1.02] tracking-tight sm:text-6xl">{r.company}</h1>
                  <p className="mt-2 text-xl font-medium">{r.role}</p>
                </div>
                <span className="rounded-md bg-[#F95C4B] px-2 py-0.5 font-medium text-white text-xs">Internship</span>
              </div>

              <p className={`mt-6 max-w-3xl text-[17px] leading-relaxed ${MUTED}`}>{r.about}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {r.facts.map((f) => (
                  <div key={f.label} className="rounded-2xl bg-[#F1ECE3] px-5 py-4 dark:bg-zinc-800/60">
                    <p className="font-display text-4xl italic leading-none tracking-tight text-[#E0402F] dark:text-[#F95C4B]">{f.value}</p>
                    <p className={`mt-2 text-sm leading-snug ${MUTED}`}>{f.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className={`mr-1 ${LABEL}`}>Tools</span>
                {r.tools.map((t) => (
                  <span key={t} className="rounded-full border border-[#E4DED2] px-3 py-1 text-sm dark:border-zinc-700">{t}</span>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <h2 className="mt-14 font-display text-3xl italic tracking-tight">What I worked on</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {r.tasks.map((t) => (
                <article key={t.no} className={`${CARD} flex flex-col p-6 sm:p-8`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-[#F95C4B]/40 px-2.5 py-0.5 font-medium text-[#E0402F] text-[11px] uppercase tracking-[0.12em] dark:text-[#F95C4B]">
                      {t.kind}
                    </span>
                    <span className="rounded-md bg-black px-2 py-0.5 font-medium text-[11px] text-[#F6F4F1] dark:bg-[#F6F4F1] dark:text-black">
                      Completed
                    </span>
                  </div>
                  <p className={`mt-5 font-mono text-xs ${MUTED}`}>Task {t.no}</p>
                  <h3 className="mt-1 font-display text-3xl italic leading-[1.05] tracking-tight">{t.title}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${MUTED}`}>{t.summary}</p>

                  <ul className="mt-5 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-snug">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#F95C4B]" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-3 border-t border-dashed border-[#D6CEBF] pt-5 dark:border-zinc-700">
                    <div className="col-span-2 sm:col-span-1">
                      <dt className={`text-xs ${MUTED}`}>Data</dt>
                      <dd className="mt-0.5 font-medium text-sm">{t.dataset}</dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className={`text-xs ${MUTED}`}>Tools</dt>
                      <dd className="mt-0.5 font-medium text-sm">{t.tools.join(" · ")}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
