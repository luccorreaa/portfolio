# Portfolio — CLAUDE.md

## Project Overview

Single-page portfolio for Luciano Correa, Full Stack Developer / Data Engineer.
**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v3 · Framer Motion v12 · lucide-react

```
src/
├── App.tsx                     # Root: LanguageProvider → Nav + sections
├── components/
│   ├── Hero.tsx                # Terminal boot sequence + cycling role typewriter
│   ├── Nav.tsx                 # Sticky top nav, EN/ES toggle
│   ├── Skills.tsx              # Tech stack grid
│   ├── Projects.tsx            # Project cards with code snippet previews
│   ├── Experience.tsx          # Timeline (system.log style)
│   ├── Contact.tsx             # Links + footer
│   ├── MatrixRain.tsx          # Canvas rain effect (Hero background)
│   ├── FloatingShapes.tsx      # Subtle ambient decoration
│   ├── Cursor.tsx              # Custom terminal cursor (hidden on mobile via `pointer: fine`)
│   └── ui/
│       ├── TerminalText.tsx    # Single-string typewriter
│       ├── GlitchText.tsx      # Glitch animation wrapper
│       └── RevealOnScroll.tsx  # Framer Motion fade-up on inView
├── context/LanguageContext.tsx # EN / ES toggle
└── data/
    ├── projects.ts             # Project entries (id, title, description, description_es, tech, github, demo, image)
    ├── experience.ts           # Work + education timeline
    ├── skills.ts               # Tech stack categories
    └── translations.ts         # UI strings in EN + ES
```

---

## Design Vision

> Inspiration reference: **priani.dev** (clean rhythm, clear hierarchy, fluid single-page flow).
> Mutated toward: **Matrix moderna** — terminal aesthetic, neon green accents, monospace typography —
> executed with **extreme minimalism and professionalism**. Not a parody. Not template-generic.
> The result must feel like the terminal of a very good engineer, not a Halloween prop.

### Three structural pillars from priani.dev to preserve
1. **Visual rhythm** — consistent vertical spacing between sections, generous whitespace that lets content breathe.
2. **Information hierarchy** — eyebrow label → section title → content, every time. Never dump raw data.
3. **Fluid single-page flow** — smooth anchor scrolling, sections that feel connected, not isolated pages.

---

## Design Tokens

```
Background:     #080808  (near-black)
Surface:        #0a0a0a / #0e0e0e
Border default: rgba(255,255,255,0.07)
Border hover:   rgba(0,255,65,0.22)

Accent green:   #00FF41   ← use sparingly: key labels, cursor, active states, tech tags
Text primary:   #ffffff
Text secondary: #666666
Text muted:     #383838 / #2a2a2a

Font mono:      JetBrains Mono / Fira Code (Tailwind: font-mono)
Font sans:      system UI stack (body copy only)

Spacing unit:   Tailwind default (4px base)
Section py:     py-28 md:py-36
Max content:    max-w-5xl mx-auto px-6 md:px-10
```

---

## Aesthetic Rules

**DO**
- Use `#00FF41` for: active nav links, eyebrow labels, tech tag borders, cursor, terminal prompts, inline keyword highlights.
- Prefix section eyebrows with `01.`, `02.`, etc. in font-mono, small, low-opacity green.
- Use fake file paths / shell commands as decorative context (e.g. `notes/notes.controller.ts`, `root@portfolio:~$`).
- Keep animations under 700ms. Prefer ease `[0.22, 1, 0.36, 1]` (custom ease-out) for reveals.
- Add corner accent lines (`border-top + border-right` / `border-bottom + border-left`) to cards on hover.
- All project cards must have equal height (use `h-full flex flex-col` down the chain).
- Project code snippets in the card header must be specific to the project's actual tech stack.

**DON'T**
- Don't saturate the page with green. Most text should be grey/white.
- Don't use glassmorphism with heavy blur — subtle `background: rgba(0,255,65,0.02)` surfaces only.
- Don't write comments explaining what code does — only non-obvious WHY.
- Don't add features beyond the task at hand.
- Don't use emojis anywhere in the UI.
- Don't show the custom cursor on touch devices (`pointer: coarse`).

---

## Animation Principles

| Element | Animation |
|---|---|
| Section reveal | `opacity 0→1, y 28→0`, `duration 0.65s`, stagger children by 0.1s |
| Card hover | `y -6px`, border color transition 0.3s, 3D tilt via `useMotionValue` |
| Scan line | Green `h-px` sweeping top→bottom on card hover, `repeat: Infinity` |
| Typewriter (name) | `TerminalText`, 48ms/char |
| Cycling role | Type-in 42ms/char → pause 1800ms → delete 28ms/char → next |
| Matrix rain | Canvas, always running in Hero background, subtle opacity |
| Cursor | Spring `stiffness: 900, damping: 40`, scales to 38px on hovering `a/button` |

---

## Content Structure

### Hero
- Boot sequence lines (4 lines, 380ms apart), fade out at 1700ms
- Name: `Luciano Correa` (TerminalText)
- Cycling role: `Data Scientist` → `Data Engineer` → `Rust enthusiast`
- Tagline: bilingual, keywords highlighted in green
- CTAs: `view_projects()` (border button) + `download_cv()` (ghost)
- Status: `● AVAILABLE · Buenos Aires, AR`

### Skills — `tech.stack`
Categories: Frontend / Backend / DevOps & Infra

### Projects — `recent.work`
- 2-column grid on `md+`, single column on mobile
- Cards: equal height, code snippet header (project-specific), title + description + tech tags + GitHub/demo icons
- Each project needs a matching `*Placeholder` component in `Projects.tsx` keyed by `project.id`

### Experience — `system.log`
Timeline with: date range · status badge (`LOADED` / `BUILT`) · role/title · institution + location · description · tech tags

### Contact — `contact.init()`
Direct links: email, GitHub, LinkedIn. No form. Minimal footer with built-with line.

---

## Bilingual (EN / ES)

All user-facing strings live in `src/data/translations.ts`. Project descriptions have both `description` (EN) and `description_es` (ES) fields on each `Project` entry. The `useLang()` hook from `LanguageContext` provides the current language.

---

## Redesign Scope (Pending)

The current implementation has the right structure and data layer but needs a visual overhaul to reach the priani.dev level of polish. Key areas:

1. **Hero** — The boot sequence and typewriter work well. Consider reworking the tagline and CTA layout for more visual impact.
2. **Skills** — Current grid is functional but flat. Explore magnetic hover or subtle glow reveals per skill tag.
3. **Projects** — Cards are solid. Code snippet headers need to stay project-specific. Consider adding a `[ ACCESSING ]` overlay on hover that's more cinematic.
4. **Experience** — Timeline structure is good. Could benefit from a more pronounced left rail and tighter spacing rhythm.
5. **Contact** — Very minimal. Possibly enhance with glitch-decode effect on hover over email/links.
6. **Global** — Review section-to-section transitions; add a subtle horizontal rule or gradient fade between sections for better flow.

---

## Dev Commands

```bash
npm run dev      # Start dev server on :5173
npm run build    # TypeScript check + Vite build → dist/
npm run preview  # Preview production build
```
