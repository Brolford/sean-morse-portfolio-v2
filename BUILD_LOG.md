# Build Log

| Step | Issue | Resolution |
|------|-------|------------|
| 1 | `npx astro add tailwind -- --yes` flag not recognized | Installed `@astrojs/tailwind` and `tailwindcss` directly via npm |
| 3 | CSS `@import` in `<style is:global>` — Astro handles Tailwind via integration, not manual import | Tailwind integration auto-injects directives; global.css loaded via integration config |
| 19 | Astro pages vs hash routing conflict — can't have both | All page content in index.astro as `.page-view` sections; router.js shows/hides them |
| 22 | Build succeeded first attempt — 1 page, 591ms | No action needed |
