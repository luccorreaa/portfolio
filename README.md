# Luciano Correa · Portfolio

Portfolio bilingüe de QA Automation y desarrollo full stack. React, TypeScript y Vite, con estética de terminal, gráficos SVG y contenido visible desde el inicio.

## Desarrollo

Requiere Node.js 20 o superior.

```sh
npm ci
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

En Cloudflare Pages, usar `npm run build` como comando y `dist` como directorio de salida. El repositorio ya versiona `dist`; la compilación actualiza también las copias de los PDF.

## Actualizar contenido

Los datos están en `src/data/`: perfil y enlaces en `profile.ts`, proyectos en `projects.ts`, trabajo en `experience.ts`, tecnologías en `skills.ts` y textos en `translations.ts`. Los enlaces de repositorios o demos no verificados se dejan en `null`.

Los CV originales están en `public/`, con sufijos `_ES.pdf` y `_EN.pdf`. Se descarga el archivo del idioma seleccionado. La elección de idioma se guarda localmente cuando el navegador lo permite.

La interfaz respeta movimiento reducido y conserva navegación por teclado. Si JavaScript no carga, el HTML muestra una presentación, contacto y enlaces a ambos CV.
