# open-slide — Framework Repo Guide

You are working on the **open-slide framework** — the runtime, CLI, and tooling that ship to npm.

(Slide-authoring guidance lives in the `slide-authoring` / `create-slide` skills under `apps/demo/.claude/skills/`. Use those only when editing files inside `apps/demo/slides/`.)

## Layout

pnpm + Turbo monorepo.

| Path | Package | Role |
| --- | --- | --- |
| `packages/core` | `@open-slide/core` | Runtime (viewer, present mode, inspector), Vite plugin, `open-slide` dev/build CLI. |
| `packages/cli` | `@open-slide/cli` | `npx @open-slide/cli init` scaffolder + project template. |
| `apps/demo` | private | Local consumer of `@open-slide/core` via `workspace:*`. Dogfood target — run `pnpm dev` here to exercise the framework. |
| `apps/web` | private | Marketing site (Next.js). |

Shared config: `biome.json`, `turbo.json`, `pnpm-workspace.yaml`, `tsconfig` per package.

## Reference docs

- Product positioning and repo-level workflow: [`README.md`](README.md)
- Core runtime and CLI surface: [`packages/core/README.md`](packages/core/README.md)
- Scaffolder behavior and generated workspace shape: [`packages/cli/README.md`](packages/cli/README.md)
- Web app stack and docs site: [`apps/web/README.md`](apps/web/README.md)

## Workflow

```bash
pnpm dev          # turbo: runs demo against local core
pnpm build        # build all packages
pnpm typecheck    # tsc across the graph
pnpm check        # biome (format + lint + organize imports)
pnpm check:fix    # auto-fix what biome can
pnpm test         # vitest
```

Filter to one package: `pnpm core <script>` / `pnpm cli <script>`.

## CubeCloud customization track

- The current customization work starts in `apps/web`. Treat package names, CLI strings, npm package ids, and repo metadata as unchanged unless the user explicitly asks for a full rebrand.
- Source logo art lives under `assets/cubecloud-logos/`. Treat that folder as the design source, not the served web path.
- For web usage, prefer copying selected logo variants into `apps/web/public/brand/` with ASCII filenames before wiring them into the site.
- Shared web branding surfaces are `apps/web/lib/shared.ts`, `apps/web/app/layout.tsx`, `apps/web/lib/layout.shared.tsx`, `apps/web/components/landing/nav.tsx`, and `apps/web/app/og/docs/[...slug]/route.tsx`.
- Landing-specific palette, copy, and logo presentation live in `apps/web/app/(home)/landing.css` and `apps/web/components/landing/`.
- `apps/web`-only branding changes do not need a changeset. If branding work expands into `packages/core` or `packages/cli`, add a changeset.
- Before broad CubeCloud branding work, use the `cubecloud-installation` skill.

## Hard rules

- **Biome must pass before commit.** Run `pnpm check` (or `pnpm check:fix`). CI and the user's review both expect a clean tree.
- **If `packages/core` or `packages/cli` changes, add a changeset.** Run `pnpm changeset`, pick the right package(s) and bump (`patch` for fixes/polish, `minor` for new public API, `major` for breaking). Apps (`demo`, `web`) and root tooling do **not** need one.
- **Changeset descriptions: short and direct.** One line, present-tense, what changed from a user's perspective. Match the tone of `.changeset/*.md` already in the repo. No paragraphs, no rationale, no "this PR…".
  - Good: `Replace spinner with a hairline + sliding bar for slide and presenter loading states.`
  - Bad: `This change introduces a new loading indicator because the previous spinner felt heavy and we wanted something more subtle for presentation contexts…`
- Don't bump versions or edit `CHANGELOG.md` by hand — `changeset version` owns that.
- Don't add dependencies casually. The `core` runtime ships to users; every dep inflates install size.
- `packages/core/src/app/components/ui` is shadcn-generated and biome-ignored — leave it alone unless regenerating.

## Releasing (reference)

`pnpm release` builds `core` + `cli` and runs `changeset publish`. Triggered by the maintainer, not by agents.
