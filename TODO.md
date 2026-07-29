# Correcciones de errores de código

## Completadas:
- [x] 1. `components/dna-backdrop.tsx` — Clases CSS incorrectas: `dna-strand--indigo`/`--amber` → `--gold`/`--violet` (coincide con `app/globals.css`)
- [x] 2. `components/case-cube.css` — `translateZ(-50%)` inválido (CSS no acepta % en translateZ) → usar `var(--cube-depth, 140px)` con `calc(-1 * ...)` para negativo
- [x] 3. `components/dna-tower.tsx` — SVG props en kebab-case (`stroke-width`, `stroke-linecap`, `stroke-linejoin`) → camelCase JSX (`strokeWidth`, `strokeLinecap`, `strokeLinejoin`)
- [x] 4. `components/filter-bar.tsx` — Clases `navy-*` inexistentes todas reemplazadas por `primary-*`
- [x] 5. `data/cases.ts` — Tipo `"red"` eliminado del union type de `category` (no usado)
- [x] 6. `components/navbar.tsx` — `bg-navy-500` → `bg-primary-500`
- [x] 7. `tailwind.config.ts` — Agregados colores `navy` y `azure` que son usados extensivamente en `dna-tower.tsx` y otros componentes
- [x] 8. `components/case-modal.tsx` — Clases `navy-*` → `primary-*` y `navy-*` corregidas
- [x] 9. `components/case-tower.tsx` — `from-navy-500/10` → `from-primary-500/10`
- [x] 10. `app/globals.css` — `shadow-neon-navy-lg` usaba color teal `rgba(15, 118, 110, ...)` → corregido a `rgba(0, 71, 230, ...)` (navy blue)
- [x] 11. `tailwind.config.ts` — Valores `boxShadow` `neon-navy`, `neon-navy-lg`, `glass-navy` usaban `rgba(37, 99, 235, ...)` → corregido a `rgba(0, 71, 230, ...)` (navy-500)
- [x] 12. `components/footer.tsx` — Render duplicado: `{link.label}` + `{link.labelText}` → solo `{linkLabelText}`
- [x] 13. `components/dna-tower.tsx` — Gradientes con opacidad en tailwind (`from-navy-500/5` no funciona con `via-` y `to-` porque tailwind no genera variantes de opacidad para via/to) → refactorizado a `opacity-5` separado
- [x] 14. `components/case-cube.tsx` — Import `motion` y params `onClick`/`focusIntensity` eliminados (no usados)
- [x] 15. `components/case-tower.tsx` — Import `useMotionValue`, constantes `WHEEL_SENSITIVITY`/`AUTO_ROTATE_SPEED` eliminados (no usados); caso `CaseCube` actualizado para quitar props eliminados
- [x] 16. `components/ui/button.tsx` — Archivo placeholder vacío eliminado
- [x] 17. `components/ui/badge.tsx` — Archivo placeholder vacío eliminado
- [x] 18. `components/case-tower.tsx` — `handleCardClick`, `focusCard`, `CLICK_DRAG_THRESHOLD` eliminados (no usados); `onSelectCase` prop removido; `anglePerCard` removido de `TowerCardSlotProps`; `onClick`/`focusIntensity` removidos del render de `TowerCardSlot`
- [x] 19. `tailwind.config.ts` — Removed `./pages/**/*` from content paths (no `pages/` directory in App Router project)
- [x] 23. `components/certifications-section.tsx` — Badge card imagen w-32/36, modal overlay transparente (sin fondo negro), scroll bloqueado con `useLenis` al abrir detalle, modal compacto
- [x] 24. `data/certs.ts` — Agregados `pdfUrl` a 4 Cisco certs que faltaban: `cisco-junior-cybersecurity-analyst`, `cisco-endpoint-security`, `cisco-network-defense`, `cisco-cyber-threat-management`. PDFs copiados de `CERTS/CISCO/CURSOS/` a `public/certs/cisco/`
- [x] 25. `app/layout.tsx` — Eliminado segundo `<source>` video Pexels (5775851 — video de persona), conservado el primero (3129671) como fondo animado

## Mejoras adicionales:
- Instalado `eslint`, `eslint-config-next`, `@typescript-eslint/*` y configurado `eslint.config.js` con flat config para ESLint 9
- Configuración de linting en el proyecto

## Listo para Vercel:
- [x] `vercel.json` creado con configuración de framework, build command y security headers
- [x] `NEXT_PUBLIC_BASE_URL` env var con fallback
- [x] Build generado de forma estática (SSG) — ideal para Vercel
- [x] `.gitignore` excluye `node_modules/`, `.next/`, `.env*`
- [x] `og-image.png` creado para Open Graph
- [x] Crear `.env.example` con variables de entorno necesarias
- [ ] Configurar `NEXT_PUBLIC_BASE_URL` en el dashboard de Vercel al hacer deploy

