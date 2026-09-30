# Plan maestro — All Stars FC

Documento de consolidación. No sustituye `_brief/BRIEF.md` como archivo histórico. Las decisiones vigentes de producto y backend siguen en `docs/ALCANCE.md`. Los campos de datos siguen en `docs/DATOS.md`.

Leyenda de estado:

| Estado | Significado |
|---|---|
| Implementado | Existe en el código actual |
| Verificado | Comprobado con build, HTML o revisión de rutas; no implica que una animación se haya visto en movimiento |
| Pendiente de verificación | El código existe, pero no se ha ejercido con clic, teclado, tacto o grabación |
| Pendiente de material | Falta un dato, foto o decisión externa |

Una captura de pantalla no verifica una animación.

---

## 1. Estado real

### Implementado

- Base informativa pública: portada, club, entrenador, categorías, horario informado, costos, patrocinadores, ubicación, contacto por Facebook, pie y 404.
- Datos públicos centralizados en `src/data/club.ts`.
- Slider de portada: primera diapositiva = escudo grande + mensaje del club. CTA fijos fuera del cambio de capa. Controles, autoplay y transiciones preparados en `src/scripts/hero-slider.ts`.
- Roster preparado: pestañas 2012/2013, tarjetas en paralelogramo, Eyecatch de cinco paneles, hover/foco, carrusel con scroll-snap. Fuente única `src/data/jugadores.json` vía `src/lib/jugadores.ts`.
- Vista `/diseno` inyectada solo con `npm run dev` (`src/dev/diseno.astro`). No entra en `npm run build`.
- Siluetas y rótulo “VISTA DE DISEÑO” exclusivos de esa vista.
- `jugadores.json`, `promociones.json` y `cumpleanos.json` vacíos.
- WhatsApp preparado (`club.whatsapp` / `PUBLIC_WHATSAPP`) y no renderizado sin número válido.
- Stack: Astro 5 + Tailwind 4. Animaciones: Web Animations API y CSS. Sin React, Next.js, Motion ni GSAP.
- Paso 2 implementado: entrada de portada por palabras/bloques, halo perceptible, filete del CTA, blur de nombre, magnet interior de flechas, destello de roster ampliado, capas de entrada y flotación separadas, pausa de usuario persistente y pausa fuera de pantalla o con pestaña oculta.

### Verificado

- `npm run build` del paso 2 genera solo `/` y `/404`. `/diseno` no está en `dist/`.
- El HTML público incluye el titular partido en palabras (`data-hero-word`), el CTA con `cta-principal`, el lema y el escudo. No hay controles de carrusel ni `#roster` mientras `jugadores.json` está vacío.
- `/diseno` en desarrollo incluye `data-magnet` y controles Anterior/Siguiente.
- No hay Playwright ni Puppeteer instalados; no se instalaron herramientas de prueba nuevas.

### Pendiente de verificación

No hay automatización de navegador en el proyecto. Clic, tacto, teclado y grabación siguen pendientes. Una captura no demuestra movimiento.

Lista manual en [http://localhost:4321/diseno](http://localhost:4321/diseno):

1. Entrada de portada en `/` (identificador, palabras del titular, lema, escudo, halo).
2. Filete dorado del botón principal al hover y al Tab.
3. En `/diseno`: Siguiente/Anterior, navegación rápida, indicadores.
4. Pausar y volver a la sección: no debe reanudar solo.
5. Reanudar, espera de ~6 s, cambio automático.
6. Flechas del teclado y que las diapositivas inactivas no reciban Tab.
7. Magnet solo en el texto interior de las flechas, con mouse.
8. Pestaña 2013 y 2012: Eyecatch y tarjetas ≤ 1,8 s.
9. Hover/foco: un destello; flotación de la figura, no de la tarjeta entera.
10. Activar “reducir movimiento”: sin entradas, blur, magnet, flotación, destellos ni autoplay.

### Pendiente de material

- Lista de jugadores autorizados y fotografías con `permisoFoto === true`.
- Presentación humana de portada (rostro y torso reales). **No está terminada.**
- WhatsApp, correo institucional, aviso de privacidad con responsable, reemplazo de Electrónica Pura, fotos de galería, promociones y cumpleaños autorizados.
- Backend: lo definen Elías y David. Contrato futuro en `docs/API-CONTRATO.md`.

### Conservar en cualquier bloque visual siguiente

- Escudo grande como primera diapositiva.
- Negro `#0A0A0A`, dorados `#ECC14E` / `#D29628`, blanco, plata solo en 2013.
- Slider existente, controles y CTA estables.
- Roster en paralelogramo (~−12°) sin añadir otra inclinación que deforme al jugador.
- Eyecatch limitado a la sección del roster.
- Fotos solo con `permisoFoto === true` y archivo presente.

---

## 2. Orden del proyecto

Este orden sustituye las fases 1–5 del Brief v2 para la planificación vigente. Los entregables del brief se conservan; cambia el momento.

| Paso | Contenido | Estado |
|---|---|---|
| 1 | Base informativa | Implementado. Verificación visual estática hecha. |
| 2 | Acabado visual y verificación de animaciones | Implementado. Build y HTML comprobados. Interacciones pendientes de prueba manual. |
| 3 | Fotos autorizadas y roster real | Pendiente de material. |
| 4 | Contacto e inscripciones | Pendiente (WhatsApp, correo, formulario, privacidad). |
| 5 | Promociones, cumpleaños y galería | Pendiente de material. |
| 6 | Centro de Partido y contrato de API | Pendiente. Backend abierto. |
| 7 | Panel del coach | Pendiente. |
| 8 | Integración, revisión final y publicación | Pendiente. Sin deploy hasta autorización. |

### Por qué cambió el orden respecto del Brief v2

El v2 iba: base → promociones + formulario → roster → Centro de Partido (Supabase) → panel del coach.

El orden actual antepone el acabado y la prueba de animaciones (paso 2) y las fotos reales (paso 3) al formulario. El Centro de Partido deja de asumir Supabase. Contacto e inscripciones (paso 4) absorben el formulario del v2. Promociones, cumpleaños y galería quedan juntos en el paso 5.

Nada de eso se elimina: se reordena.

Pendientes que no se pierden: WhatsApp, correo, aviso de privacidad, lista de jugadores, permisos de foto, logos faltantes, contenido comunitario y backend con Elías/David.

---

## 3. Referencias React Bits

Fuentes consultadas:

- Catálogo: [https://reactbits.dev](https://reactbits.dev) y [https://reactbits.dev/llms.txt](https://reactbits.dev/llms.txt)
- Repositorio: [https://github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)
- Instalación: [https://reactbits.dev/get-started/installation](https://reactbits.dev/get-started/installation)
- Licencia: [https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)
- Código TS + Tailwind de cada efecto en `src/ts-tailwind/` del repositorio (24 de septiembre de 2026)

**Demos en el sitio: no verificadas.** Las fichas de cada efecto devolvieron solo el cascarón de la app. El comportamiento se toma del `llms.txt` oficial y del código fuente, no de una demo vista.

**Licencia (si se copiara código):** MIT + Commons Clause. Se puede usar en un sitio; no se pueden vender ni redistribuir los componentes como tal. Hay que conservar el aviso de copyright. **Recomendación:** no copiar esos archivos. Reproducir el gesto con implementación propia en Astro. Así no se instala React ni se arrastra Commons Clause sobre código ajeno.

El `package.json` del repositorio incluye React, `gsap`, `@gsap/react`, `motion`, Three.js y más. Eso es el sitio de documentación, no la dependencia de cada efecto. Abajo, las dependencias reales del archivo de cada componente.

No se instalará React, Next.js, Framer Motion, `motion` ni la biblioteca completa.

### Split Text

| Campo | Detalle |
|---|---|
| URL | [https://www.reactbits.dev/text-animations/split-text](https://www.reactbits.dev/text-animations/split-text) |
| Dónde | `src/components/Hero.astro` (`h1` con `[data-hero-block]`) y `src/scripts/hero-slider.ts` |
| Gesto | Parte el texto en caracteres, palabras o líneas y entra en escalonado. |
| Dependencias del original | `react`, `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText`, `@gsap/react`. La documentación de instalación pone `npm install gsap` como ejemplo de este componente. |
| Adaptación Astro | Implementación propia. El HTML ya trae el titular en dos bloques. En el paso 2 se pueden envolver palabras en `span` generados en el servidor (el texto sigue en el HTML). WAAPI: `opacity` + `translate3d`, stagger corto. Sin GSAP SplitText. |
| Móvil / teclado / reduced-motion | Móvil: misma entrada, stagger más breve. Teclado: no interfiere. Con movimiento reducido: texto visible, sin split animado. |
| Código | Adaptar `animarEntradaInicial()`. No copiar el `.tsx`. |
| Licencia | Solo aplica si se copia el original. No se copiará. |

### Blur Text

| Campo | Detalle |
|---|---|
| URL | [https://www.reactbits.dev/text-animations/blur-text](https://www.reactbits.dev/text-animations/blur-text) |
| Dónde | Nombre del jugador en diapositivas de portada (`Hero.astro`, bloque de copia del jugador). |
| Gesto | El texto arranca borroso y se nítida. |
| Dependencias del original | `react` y `motion/react` (paquete `motion`, línea de Framer Motion). |
| Adaptación Astro | Implementación propia con WAAPI (`filter: blur()`, `opacity`, `translate3d`) sobre palabras ya marcadas en HTML. Una sola vez al entrar el slide. No animar blur en superficies grandes ni en bucle. |
| Móvil / teclado / reduced-motion | Móvil: blur menor o solo opacidad. Teclado: el nombre no es control. Reduced-motion: nombre nítido desde el inicio. |
| Código | Nuevo helper en `hero-slider.ts`. No instalar `motion`. |
| Licencia | No copiar el original. |

### Animated Content

| Campo | Detalle |
|---|---|
| URL | [https://www.reactbits.dev/animations/animated-content](https://www.reactbits.dev/animations/animated-content) |
| Dónde | No envolver todo el sitio. Como mucho, un refuerzo breve en `Club.astro` o el encabezado del roster, sin competir con Eyecatch ni con la portada. |
| Gesto | Envoltorio que anima hijos al entrar en vista. |
| Dependencias del original | `react`, `gsap`, `gsap/ScrollTrigger`. El original deja `opacity` inicial en 0 por JS. |
| Adaptación Astro | IntersectionObserver + WAAPI ya usados en el roster. No añadir fade-in a cada sección. Si se usa, desplazamiento e opacidad suaves, contenido visible en el HTML (nada de `opacity: 0` en CSS permanente). |
| Móvil / teclado / reduced-motion | Una sola vez al entrar. Reduced-motion: visible al instante. |
| Código | Reutilizar el patrón de `roster.ts`, no un wrapper genérico en todas las secciones. |
| Licencia | No copiar el original. |

**Propuesta:** no adoptarlo como sistema de entradas. La portada y el Eyecatch ya cubren las dos entradas fuertes.

### Glare Hover

| Campo | Detalle |
|---|---|
| URL | [https://www.reactbits.dev/animations/glare-hover](https://www.reactbits.dev/animations/glare-hover) |
| Dónde | `src/components/RosterCard.astro` (ya existe `.is-gleam`). |
| Gesto | Destello que recorre el elemento al pasar el cursor. |
| Dependencias del original | Solo React. El brillo es un degradado CSS que cambia `background-position`. |
| Adaptación Astro | CSS propio. En escritorio, destello al hover y al foco. El destello secuencial de reposo se mantiene (una tarjeta a la vez). En móvil, no hover; el destello de reposo basta. Sin segunda inclinación. |
| Móvil / teclado / reduced-motion | Foco de teclado = mismo destello que hover. Reduced-motion: sin destello. |
| Código | Ampliar estilos de `RosterCard.astro` y la clase `is-gleam` de `roster.ts`. |
| Licencia | No copiar el original. |

### Star Border

| Campo | Detalle |
|---|---|
| URL | [https://www.reactbits.dev/animations/star-border](https://www.reactbits.dev/animations/star-border) |
| Dónde | Botón “Agenda tu clase gratis” en `Hero.astro`. |
| Gesto | Borde animado con destellos que recorren el perímetro. |
| Dependencias del original | Solo React + keyframes de Tailwind. Sin GSAP ni Motion. |
| Adaptación Astro | Implementación propia, más sobria: filete dorado con un destello lineal en hover/foco, no estrellas orbitando en bucle. El CTA debe seguir siendo un enlace claro. |
| Móvil / teclado / reduced-motion | En móvil, un brillo al pulsar o ninguno. Foco visible (ya hay outline dorado). Reduced-motion: borde estático. |
| Código | CSS en `Hero.astro`. No copiar keyframes de “star-movement”. |
| Licencia | No copiar el original. |

**Propuesta:** sí el acento de botón; no el recubrimiento de estrellas en loop.

### Magnet

| Campo | Detalle |
|---|---|
| URL | [https://www.reactbits.dev/animations/magnet](https://www.reactbits.dev/animations/magnet) |
| Dónde | Botones Anterior/Siguiente del slider (`[data-hero-prev]`, `[data-hero-next]`). |
| Gesto | El control se acerca un poco al cursor y vuelve. |
| Dependencias del original | Solo React. `mousemove` + `transform`. |
| Adaptación Astro | Implementación propia, desplazamiento máximo 4–6 px, solo `pointer: fine` y escritorio. Nada en táctil. No aplicar al CTA principal. |
| Móvil / teclado / reduced-motion | Móvil: desactivado. Teclado: el botón no se mueve al enfocar. Reduced-motion: desactivado. |
| Código | Pocas líneas en `hero-slider.ts`. |
| Licencia | No copiar el original. |

---

## 4. Coordinación visual propuesta

Una cosa a la vez. La portada y el roster no se animan al mismo tiempo.

### Entrada de portada (primera visita, slide del escudo)

1. Identificador `ALL STARS FC · CHIHUAHUA`.
2. Titular, dos bloques (gesto Split Text propio, por palabras o líneas, no por letra si ensucia la lectura).
3. Lema.
4. Escudo: traslación + escala suaves. El halo se mueve despacio en reposo (`transform` y `opacity`).
5. Los CTA ya están en el HTML y no se desplazan.

Duración total de entrada: unos 0,8–1,0 s. Con movimiento reducido: todo visible, sin entrada.

### Cambio de slide

1. Barrido diagonal existente (~760 ms).
2. Sale la figura (escudo o jugador) y entra la nueva.
3. El nombre del jugador (si hay slide real o de diseño) hace el gesto Blur Text propio, una vez.
4. El número gigante entra desde la derecha.
5. CTA e identificador de contacto no se mueven.

Al cambiar rápido se cancelan las animaciones anteriores.

### Entrada del roster (al entrar en vista o al cambiar de pestaña)

1. Eyecatch de cinco paneles + escudo y nombre de categoría.
2. Salen los paneles.
3. Tarjetas, número y franja, escalonados.
4. Tope 1,8 s. Luego reposo.

No lanzar Animated Content sobre el roster a la vez que el Eyecatch.

### Reposo

- Halo de portada: pulso lento.
- Roster: flotación 2–3 px y destello de una tarjeta cada ~4 s.
- Nada de filtros pesados en bucle sobre fondos grandes.

### Interacción

- Escritorio: hover/foco ensancha la tarjeta; destello tipo Glare Hover; Magnet solo en flechas del slider.
- Móvil: scroll-snap; sin magnet; destello de reposo.
- Controles del slider: visibles solo si hay más de una diapositiva.
- Reduced-motion: sin autoplay, sin flotación, sin destello, sin magnet, sin blur.

Los textos se marcan en el HTML (spans de servidor). Si falla el JS, se leen enteros.

---

## 5. Paso 2 — implementado

Archivos tocados: `src/components/Hero.astro`, `src/scripts/hero-slider.ts`, `src/components/RosterCard.astro`, `src/scripts/roster.ts`, `src/styles/global.css`.

El siguiente trabajo de producto es el paso 3 (fotos y jugadores reales), no otro acabado visual, salvo correcciones que salgan de la lista manual.

`/diseno` sigue siendo el lugar para probar el slider y el roster hasta que haya fotos autorizadas. La presentación humana no está terminada.

---

## 6. Cómo verificar el paso 2

En `npm run dev`:

1. [http://localhost:4321/](http://localhost:4321/) — solo escudo, sin controles.
2. [http://localhost:4321/diseno](http://localhost:4321/diseno) — Anterior, Pausar, Siguiente, teclado, espera de 6 s, pestañas 2012/2013, hover y móvil.
3. Activar “reducir movimiento” y repetir `/diseno`.
4. `npm run build` — no debe aparecer `/diseno`.

Hasta no completar esa lista, las animaciones siguen en “pendiente de verificación”.
