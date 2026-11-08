// Saves Tirth's GitHub contribution counts (last ~year, one number per day) to src/data/contributions.json.
// Needs a token in GITHUB_TOKEN or GH_TOKEN. If the request fails, the existing file is kept,
// so a build never breaks because GitHub was unreachable.
import { readFileSync, writeFileSync } from "node:fs";

const USER = "tirthfx";
const OUT = new URL("../src/data/contributions.json", import.meta.url);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

try {
  if (!token) throw new Error("no GITHUB_TOKEN / GH_TOKEN set");
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json", "User-Agent": "tirthfx-portfolio" },
    body: JSON.stringify({ query, variables: { login: USER } }),
  });
  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!weeks) throw new Error(JSON.stringify(json.errors ?? json).slice(0, 300));
  const days = weeks.flatMap((w) => w.contributionDays);
  const out = { user: USER, endDate: days.at(-1).date, data: days.map((d) => d.contributionCount) };
  writeFileSync(OUT, JSON.stringify(out) + "\n");
  console.log(`contributions: ${out.data.length} days to ${out.endDate}, total ${out.data.reduce((a, b) => a + b, 0)}`);
} catch (e) {
  let kept = false;
  try { readFileSync(OUT); kept = true; } catch {}
  console.warn(`contributions: fetch failed (${e.message}); ${kept ? "keeping the saved file" : "no saved file"}`);
  if (!kept) process.exit(1);
}
