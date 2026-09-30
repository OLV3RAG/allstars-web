# All Stars FC

Sitio oficial del equipo de fútbol infantil **All Stars FC**, Chihuahua.

- En línea: [https://allstars-web.vercel.app](https://allstars-web.vercel.app)
- Facebook: [AllStarsFcChihuahua](https://www.facebook.com/AllStarsFcChihuahua)
- Escudo en PNG: [https://allstars-web.vercel.app/allstars-fc-escudo.png](https://allstars-web.vercel.app/allstars-fc-escudo.png)

Para la ficha completa del club, el texto de cada sección, lo que falta y las reglas de privacidad, abre **`CONTEXTO.md`**.

## Requisitos

- Node.js 20 o superior
- npm

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

El servidor local queda en la URL que imprima Astro (por lo general `http://localhost:4321`).

En desarrollo, `http://localhost:4321/diseno` muestra una vista de diseño con siluetas. **No** se incluye en `npm run build` ni en Vercel.

```bash
npm run build
npm run preview
```

`build` genera el sitio estático en `dist/`. `preview` sirve esa carpeta.

## Cómo editar la información

Los datos públicos del club (costos, horarios, sede, Facebook, categorías, patrocinadores) están en `src/data/club.ts`. Cámbialos ahí para que se actualicen en todo el sitio.

| Archivo | Uso |
|---|---|
| `src/data/club.ts` | Identidad, costos, horarios, sede, redes, patrocinadores |
| `src/data/jugadores.json` | Roster (hoy vacío) |
| `src/data/promociones.json` | Promociones (hoy vacío) |
| `src/data/cumpleanos.json` | Cumpleaños (hoy vacío) |

No agregues jugadores, promociones ni cumpleaños inventados.

El escudo y los logos oficiales están en `assets/`. No alteres sus colores ni proporciones.

- Escudo: `assets/logo/escudo.png` (copia descargable en `public/allstars-fc-escudo.png`)
- Patrocinadores: `assets/patrocinadores/` (RASA, Electrónica Pura, CADEL, Dr. Oscar Adrián García Ballesteros)

WhatsApp: confirma el número y ponlo en `club.whatsapp` o en `PUBLIC_WHATSAPP` (solo dígitos, con lada, 10 a 15 caracteres). Sin número válido el botón flotante no aparece.

## Horarios publicados

- Miércoles · 5:00–6:30 p.m.
- Viernes · 4:30–6:00 p.m.

## Publicar en Vercel

El proyecto ya existe en el equipo Pro `jorgeluisherediachaveste71-codes-projects/allstars-web`.

```bash
npx vercel deploy --prod --yes --scope jorgeluisherediachaveste71-codes-projects
```

Eso actualiza [https://allstars-web.vercel.app](https://allstars-web.vercel.app).

Variables de entorno en Vercel (si se usan): solo `PUBLIC_WHATSAPP`. No subas `.env` al repositorio.

## Documentación

- `CONTEXTO.md` — información de la página, textos y pendientes
- `docs/PLAN-MAESTRO.md` — estado y orden de trabajo
- `docs/ALCANCE.md` — decisión de backend abierto
- `docs/DATOS.md` — campos del roster y permisos de foto
- `_brief/BRIEF.md` — brief histórico (v2); si hay diferencia, mandan ALCANCE y el plan maestro
