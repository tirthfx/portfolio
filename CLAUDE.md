# Portfolio — agent instructions

Fresh start (2026-10-28). Nothing from the previous build carries over.

## Planning vault
There is an Obsidian vault for this portfolio at `~/Developer/portfolio-vault` (start at `00 Home.md`). It is not part of this repo and is not in git.

**Every decision must be logged in the vault.** Any decision about stack, design, content, hosting, workflow or tooling gets a note in `Decisions/` (`YYYY-MM-DD Title.md`: date, status, decision, why) and a row in `Decision Log.md`, before or when it is acted on. Record completed work in `Build Log.md` and upcoming work in `Roadmap.md`.

## Stack
Astro (static output) with React islands, TypeScript strict, pnpm. Deployed to GitHub Pages by `.github/workflows/deploy.yml`. Add Next.js only if a feature needs a server runtime, as a separate app.

## Commands
- `pnpm dev`: dev server
- `pnpm check`: astro check (types)
- `pnpm build`: static build into `dist/`

## Contributing
Every change goes through an issue, then a pull request, then a merge:
1. Open an issue describing the change.
2. Branch from `main` (`<issue-number>-short-name`), commit there.
3. Open a PR that references the issue (`Closes #n`).
4. Merge the PR once checks pass. No direct pushes to `main`.

See `CONTRIBUTING.md`.
