"use client";

import ActivityTerrain from "@/components/kokonutui/activity-terrain";
import contributions from "@/data/contributions.json";

// Palette ramp: Paper → Stone → Black in light, the reverse in dark; Coral for the highlight.
const COLORS =
  "[--terrain-0:#ECE7DF] [--terrain-1:#D6CEBF] [--terrain-2:#A89F90] [--terrain-3:#5C554B] [--terrain-4:#000000] [--terrain-accent:#F95C4B] [--terrain-text:#6B655C] " +
  "dark:[--terrain-0:#1C1B1A] dark:[--terrain-1:#3A3733] dark:[--terrain-2:#6B655C] dark:[--terrain-3:#B5ADA0] dark:[--terrain-4:#F6F4F1] dark:[--terrain-accent:#F95C4B] dark:[--terrain-text:#A39B8F]";

// Show the last 3 months (13 weeks); the data file holds a full year.
const DAYS_SHOWN = 13 * 7;

/** Tirth's GitHub contributions for the last 3 months (data refreshed by scripts/fetch-contributions.mjs). */
export default function Contributions() {
  return (
    <section className="px-4 pt-20 pb-24">
      <div className="mx-auto flex max-w-5xl justify-center">
        <ActivityTerrain
          data={contributions.data.slice(-DAYS_SHOWN)}
          endDate={contributions.endDate}
          title="GitHub contributions"
          className={`max-w-4xl border-[#E4DED2] bg-[#FCFBF8] text-black dark:border-zinc-800 dark:bg-zinc-950 ${COLORS}`}
        />
      </div>
    </section>
  );
}
