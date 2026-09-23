# Luciano Correa · Portfolio

Portfolio bilingüe de QA Automation y desarrollo full stack. React, TypeScript y Vite, con tipografía editorial, acentos verde salvia y gráficos SVG propios. El CV, LinkedIn y GitHub están accesibles desde la portada.

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

## Diseño y movimiento

`MotionContext` combina la preferencia de movimiento reducido del dispositivo con el control de pausa de la navegación. `PageMotion` administra las apariciones por sección con IntersectionObserver y Web Animations API: el contenido permanece visible sin animación, cada bloque se revela una sola vez y el foco de teclado interrumpe cualquier transición pendiente.

`EngineeringVisual` contiene la ilustración orbital SVG y la respuesta al cursor con resortes amortiguados. Las órbitas se pausan fuera de pantalla; la inclinación no se activa con interacción táctil. No se agregaron dependencias de animación ni fuentes externas. Los estilos de impresión priorizan experiencia, proyectos y datos de contacto.
