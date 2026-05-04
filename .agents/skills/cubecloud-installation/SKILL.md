---
name: cubecloud-installation
description: Plan and execute the first-pass CubeCloud customization of the open-slide repo. Use when the user asks to brand open-slide for CubeCloud, wire CubeCloud logos into the web app, prepare a CubeCloud fork, or create a rollout plan before implementation.
---

# CubeCloud installation plan

This skill owns the **planning and execution guardrails** for CubeCloud-specific customization of this repo. The current default scope is the web app in `apps/web`; do not widen to package/runtime rebranding unless the user asks for it.

## Default stance

- Default to **web-app integration first**, not a full product rename.
- Keep `@open-slide/core`, `@open-slide/cli`, the `open-slide` command, repo links, and npm-facing names unchanged unless the user explicitly approves a full rebrand.
- Treat the work as a branded fork or deployment layer until the user says otherwise.

## Brand source of truth

- Source logo art is under `assets/cubecloud-logos/`.
- Prefer `assets/cubecloud-logos/logo.svg/` over PNG/PDF when adding web assets.
- Available variants are sized square and horizontal lockups:
  - `1290X480` for wide header or social usage
  - `512X512` or `120X120` for app/icon surfaces
  - `反白` for dark surfaces, `反黑` for light surfaces, `常规` when the standard mark fits the background
- Keep the original source filenames in `assets/`, but create ASCII deployment filenames in `apps/web/public/brand/` before referencing them from the site.

## First files to inspect

- `apps/web/lib/shared.ts`: app name, site URL, repo metadata, canonical identifiers
- `apps/web/app/layout.tsx`: global metadata, icons, social metadata defaults
- `apps/web/lib/layout.shared.tsx`: docs nav title and shared logo mark
- `apps/web/components/landing/nav.tsx`: landing header branding
- `apps/web/app/(home)/landing.css`: landing palette and light/dark logo switching
- `apps/web/components/landing/`: landing copy and branded surfaces
- `apps/web/app/og/docs/[...slug]/route.tsx`: OG image logo and footer branding

## Implementation order

1. Lock the branding mode.
   Ask once if the user wants `co-branded` or `full rebrand`. If unspecified, assume `co-branded web app only`.

2. Prepare served assets.
   Copy the chosen CubeCloud SVG/PNG variants from `assets/cubecloud-logos/` into `apps/web/public/brand/` with ASCII filenames that encode role and theme, for example `cubecloud-mark-dark.svg` or `cubecloud-lockup-light.svg`.

3. Replace shared web chrome.
   Update the docs nav and landing nav first so the brand appears in both the docs shell and homepage shell before touching page content.

4. Update metadata surfaces.
   Align `app/layout.tsx`, favicon/icon choices, and `app/og/docs/[...slug]/route.tsx` so browser chrome and social previews use the same selected brand assets.

5. Adjust palette and copy.
   Only after the mark placement works, tune `landing.css` and landing section copy to reflect CubeCloud positioning.

6. Defer broader rebrand work unless requested.
   If the user later wants package names, docs copy, templates, CLI defaults, or demo workspace content rebranded, treat that as a second phase.

## Hard rules

- Do not reference files out of `assets/cubecloud-logos/` directly from client-facing URLs. Put web-served assets under `apps/web/public/` first.
- Do not guess at which logo variant to use. Base it on surface type: dark background uses `反白`, light background uses `反黑`, wide header/OG prefers `1290X480`, compact nav/icon prefers `120X120` or `512X512`.
- Avoid non-ASCII deployment filenames in `public/brand/` even though the source archive uses Chinese names.
- Preserve the existing warm-paper / ink / vermillion visual language unless the user explicitly wants CubeCloud palette changes as part of the same phase.
- `apps/web`-only work does not need a changeset. Touching `packages/core` or `packages/cli` does.

## Validation

- Run a narrow check on the web app after edits: `pnpm --filter web lint`.
- If branding assets or metadata changed materially, also run `pnpm --filter web build`.
- Verify both landing and docs shells render the intended logo variant in light and dark themes.

## Hand-off

Report these facts back to the user:

- which branding mode you used
- which source logo variants were selected
- which files were updated
- which scope was intentionally deferred