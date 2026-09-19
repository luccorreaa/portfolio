# Portfolio de Luciano Correa

Single-page React 19 + TypeScript + Vite portfolio. Tailwind provides the CSS reset; the visual system lives in `src/index.css`. Icons use lucide-react.

## Design

Preserve the understated terminal / Matrix identity: near-black surfaces, restrained green accents, monospace technical labels, generous whitespace, and readable body copy. Main content uses system fonts; there are no external font requests.

- Show all content immediately. No boot screens, typewriters, scroll-gated content, or custom cursor.
- Keep illustrations as static SVG. Do not reintroduce WebGL, canvas render loops, pointer tracking, or animation libraries for decorative effects.
- Use short CSS hover and press feedback, clear focus indicators, native anchors and reduced-motion support.
- Keep text contrast high, touch targets usable, and the layout free of horizontal overflow down to 320px.
- Navigation is a mobile disclosure, with Escape/outside-click dismissal. Keep the language selector available at every width.
- Provide an HTML fallback in `index.html`, so contact and CV links remain available if the JavaScript bundle does not load.

## Content

The supplied CVs are the source of truth. Luciano is a QA Automation Engineer at WestDigital since August 2025, studying Information Systems Engineering at UTN and building toward full stack development. Do not present a desired role as a current employment title.

- `src/data/translations.ts`: interface copy in Spanish and English.
- `src/data/profile.ts`: contact, social and CV URLs.
- `src/data/projects.ts`: all four 2026 projects, descriptions, stacks and authorship.
- `src/data/experience.ts`: WestDigital responsibilities.
- `src/data/skills.ts`: tool groups.
- `src/context/LanguageContext.tsx`: browser-language default, persisted manual selection, document language and metadata.
- `public/CV_Luciano_Correa_ES.pdf` and `public/CV_Luciano_Correa_EN.pdf`: supplied original CVs.

Do not invent project metrics, employment experience, repository URLs, or demos. The new projects without verified public repository URLs intentionally use `null` and render without a source-code link. Diagrams are illustrative and labeled as schematics, not screenshots of running products.

## Structure

Hero → projects → professional experience and education → technical skills and languages → contact. Content and main actions are available without hover or expansion. Contact uses mail, phone and social links, plus an email-copy button with success and error feedback; there is no backend form.

## Verification

- `npm ci`
- `npm run dev` (default port 5173)
- `npm run build` (TypeScript + production assets in `dist/`)
- `npm run preview` (default port 4173)

Check both languages, narrow/mobile/desktop widths, menu dismissal and keyboard focus, anchor offsets, CV URLs, copy feedback and console errors. The existing repository tracks `dist/`, so regenerate it when delivering production changes. For Cloudflare Pages, use `npm run build` with `dist` as the output directory.
