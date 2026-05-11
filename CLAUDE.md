# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build (outputs to .svelte-kit/cloudflare/)
npm run preview   # preview the production build locally
npm run lint      # prettier --check + eslint
npm run format    # prettier --write
```

Deploy via Wrangler after building:
```bash
npx wrangler deploy
```

## Architecture

Single-page SvelteKit portfolio deployed to **Cloudflare Workers** via `@sveltejs/adapter-cloudflare`. There are no API routes — the entire site is one page.

**Key files:**
- `src/routes/+page.svelte` — the entire portfolio: all UI, logic, animations, and bilingual content live here
- `src/routes/layout.css` — global layout styles imported by `+layout.svelte`
- `src/app.html` — HTML shell; Google Fonts (`IBM Plex Mono`, `Outfit`) are loaded here
- `static/cv.pdf` — CV file served directly; downloaded via `/cv.pdf`
- `wrangler.jsonc` — Cloudflare deployment config pointing at `.svelte-kit/cloudflare/`

## Svelte 5 Runes

The project uses **Svelte 5 runes mode** for all components (enabled globally in `svelte.config.js` for non-`node_modules` files). Use `$state`, `$derived`, and `$effect` instead of `let` + reactive statements.

## Content & i18n

All bilingual content (ES/EN) is stored in a `t` object inside `+page.svelte`. The active language is a `$state` variable (`lang`). To add or edit text, update both the `es` and `en` keys in that object.

## Styling

Tailwind CSS v4 (via `@tailwindcss/vite`) plus component-scoped `<style>` blocks in `.svelte` files. Brand accent color is `#00ff9c`. Typography uses `IBM Plex Mono` (monospace/labels) and `Outfit` (body).
