# Contexto — All Stars FC

Documento para quien reciba el código o revise el sitio. Recoge **toda la información que hoy publica la página**, lo que está preparado pero oculto, y lo que todavía no se puede inventar.

Fecha de este recorte: 28 de septiembre de 2026.

---

## 1. Qué es

All Stars FC es un equipo de fútbol infantil en Chihuahua, fundado en 2025. El sitio existe para que papás y mamás conozcan al club y agenden una clase muestra.

Visitante principal: familias desde el celular.

Sitio en línea: **https://allstars-web.vercel.app**

Facebook oficial: **https://www.facebook.com/AllStarsFcChihuahua**

Escudo en PNG: **https://allstars-web.vercel.app/allstars-fc-escudo.png**

El sitio es una sola página informativa (`/`) más una página 404. No hay aviso de privacidad, formulario, login, partidos en vivo ni panel del entrenador.

---

## 2. Datos oficiales que sí se publican

Fuente única: `src/data/club.ts`. Si un dato no está ahí, no está confirmado.

| Campo | Valor |
|---|---|
| Nombre | All Stars FC |
| Ciudad | Chihuahua, Chihuahua |
| Fundación | 2025 |
| Lema | All Stars FC es más que fútbol. Es equipo, es unión, es amistad. |
| Entrenador | Prof. René Loya |
| Cargo del entrenador | Entrenador de la UACH |
| Sede | Cancha La Raza |
| Calle | Calle Huitzilopochtli |
| Referencia | atrás de la Churubusco |
| Ciudad de la sede | Chihuahua, Chih. |
| Edades | Desde los 8 años |
| Categorías | 2012 (acento dorado) y 2013 (acento plata) |
| Entrenamiento | Miércoles, 5:00–6:30 p.m. · Viernes, 4:30–6:00 p.m. |
| Mensualidad | $600 MXN |
| Inscripción | $0 (se muestra como “Inscripción gratis”) |
| Clase muestra | Gratis |
| Facebook | https://www.facebook.com/AllStarsFcChihuahua |
| WhatsApp | Vacío. El botón flotante no se muestra. |
| Correo | Vacío. No se muestra. |
| Liga / torneo | Pendiente. No se menciona en el sitio. |
| Instagram | Pendiente. No se muestra. |
| Dominio propio | Pendiente. Hoy se usa el de Vercel. |

### Patrocinadores

En escritorio van en **una sola fila**, en este orden:

1. **RASA Centro de Servicio Automotriz** — `assets/patrocinadores/rasa.svg` (hay `rasa.png` de respaldo).
2. **Electrónica Pura y de Servicios** — `assets/patrocinadores/electronica-pura.png` sobre fondo perla. El archivo es blanco; en pantalla se muestra oscuro para que se lea.
3. **CADEL Sistemas** — `assets/patrocinadores/cadel.png` (blanco sobre rojo).
4. **Dr. Oscar Adrián García Ballesteros** — `assets/patrocinadores/oscar-garcia.png` (logo vectorial exportado a PNG).

### SEO que ve Google / al compartir

- Título: `All Stars FC | Escuela de fútbol infantil en Chihuahua`
- Descripción: `All Stars FC es un equipo de fútbol infantil en Chihuahua. Clase muestra gratis, inscripción sin costo y mensualidad de $600. Categorías 2012 y 2013.`
- Idioma: `es` / `es_MX`
- Favicon: escudo oficial (`public/favicon.png`)

---

## 3. Recorrido de la página (textos tal como salen)

Orden de arriba a abajo en `/`.

### Encabezado

- Logo + “All Stars FC” + “Chihuahua · 2025”.
- Menú: El club · Entrenador · Categorías · Patrocinadores · Ubicación · Contacto · Facebook.
- El enlace **Roster** no aparece mientras `jugadores.json` esté vacío.
- En móvil: botón Menú / Cerrar.

### Portada (`#inicio`)

- Identificador: `ALL STARS FC · CHIHUAHUA`
- Titular:
  - “El talento se entrena.”
  - “El equipo se construye.” (en dorado)
- Lema entre comillas.
- Escudo oficial a gran escala (protagonista visual).
- Botón principal: **Agenda tu clase gratis** → `#contacto`
- Botón secundario: **Conoce al equipo** → `#el-club` (iría a `#roster` si hubiera jugadores)
- Franja inferior: `$600 al mes · Inscripción gratis · Desde los 8 años` y los dos horarios.

Con el roster vacío **no hay** controles Anterior/Siguiente ni diapositivas de jugadores. La primera (y única) diapositiva es el escudo.

### El club (`#el-club`)

- Rótulo: El club
- Año **2025** y “Hecho en Chihuahua”
- Título: “El grupo es el motivo”
- “All Stars FC es un equipo de fútbol infantil en Chihuahua. El entrenamiento es el oficio.”
- Tres valores en franja:
  - **Equipo** — Se entrena junto. Nadie llega solo al partido.
  - **Unión** — Familias, jugadores y cuerpo técnico en la misma cancha.
  - **Amistad** — El resultado también se ve fuera del marcador.

### Entrenador (`#entrenador`)

- Rótulo: Cuerpo técnico
- Nombre: Prof. René Loya (el “Prof.” va aparte; el nombre a escala)
- Cargo: Entrenador de la UACH
- No hay foto del entrenador (no se inventó).

### Categorías y costos (`#categorias`, `#costos`)

- Rótulo: Categorías y horarios
- Título: “Dos categorías. Un mismo equipo.”
- “Desde los 8 años. Horario de entrenamiento: miércoles de 5:00–6:30 p.m. y viernes de 4:30–6:00 p.m.”
- Bloques 2012 (dorado) y 2013 (plata)
- Entrenamiento:
  - Miércoles · 5:00–6:30 p.m.
  - Viernes · 4:30–6:00 p.m.
- Franja dorada:
  - $600 al mes — Mensualidad
  - Inscripción gratis — $0 de inscripción
  - Clase muestra — Gratis

### Patrocinadores (`#patrocinadores`)

- Rótulo: Patrocinadores
- Título: “Quienes impulsan al equipo”
- Cuatro marcas, en el orden de la sección 2.

### Ubicación (`#ubicacion`)

- Rótulo: Ubicación
- Título: Cancha La Raza
- Calle Huitzilopochtli
- atrás de la Churubusco
- Chihuahua, Chih.
- Texto: “Consulta la dirección en Google Maps.”
- Botón: **Abrir en Google Maps** (búsqueda, no mapa embebido)
- Placa: “Cómo llegar”

### Contacto (`#contacto`)

- Fondo dorado, texto negro
- Rótulo: Clase muestra
- Título: “Ven a conocer la cancha”
- “La clase muestra es gratis. Escríbenos por Facebook para pedir informes de horarios y cómo acompañar a tu hija o hijo en la primera visita. Te responderemos por ese canal.”
- Botón: **Contactar por Facebook**

### Pie

- All Stars FC
- Chihuahua, Chihuahua · Desde 2025
- Cancha La Raza · Miércoles 5:00–6:30 p.m. · Viernes 4:30–6:00 p.m.
- Facebook
- © 2026 All Stars FC

### 404

- “Esta página no está en la cancha”
- “El enlace no corresponde a una sección del sitio. Vuelve al inicio para conocer al club o pedir informes de la clase muestra.”
- Botón: Volver al inicio

---

## 4. Qué no se publica (y no se debe inventar)

Estas cosas están vacías o pendientes. El sitio **no las muestra** y nadie debe rellenarlas con datos de prueba.

| Pendiente | Estado |
|---|---|
| Lista de jugadores | `jugadores.json` = `[]` |
| Fotos de jugadores | `assets/fotos/` vacía |
| WhatsApp | Sin número confirmado |
| Correo institucional | Sin dato |
| Instagram | Sin URL |
| Liga donde compiten | Sin dato |
| Otros días de entrenamiento | Miércoles y viernes informados. Más días, si existen, pendientes |
| Más categorías además de 2012 y 2013 | Sin confirmar |
| Foto del Prof. René Loya | No hay archivo autorizado |
| Logo en vector nativo de CADEL | Hoy es PNG recortado del original |
| Logo definitivo de Electrónica Pura | Sigue el archivo blanco actual, sobre perla |
| Promociones | JSON vacío |
| Cumpleaños | JSON vacío |
| Galería | Sin fotos autorizadas |
| Formulario de inscripción | No implementado |
| Aviso de privacidad | Falta responsable y contactos institucionales |
| Centro de Partido / resultados | No implementado |
| Panel del coach | No implementado |
| Backend (base de datos, correo) | Lo definen Elías y David. No se asume Supabase. |

Reglas de menores:

- No publicar apellidos completos, fechas de nacimiento ni otros datos personales.
- Foto solo si `permisoFoto === true` **y** el archivo existe.
- Si no, silueta genérica con colores del club.
- Cumpleaños futuros: solo primer nombre y día/mes, con autorización. Sin apellido ni año.

---

## 5. Lo que está construido pero oculto al público

### Roster y slider de jugadores

El código del roster (pestañas 2012/2013, tarjetas en paralelogramo, Eyecatch) ya existe. Mientras no haya jugadores autorizados, **no se renderiza** en producción.

Cuando alguien llene `jugadores.json` con `activo: true` y fotos con permiso, aparecerán:

- Enlace Roster en el menú
- Sección de tarjetas
- Diapositivas de portada solo para quienes tengan recorte de rostro/torso (`fotoPortada`)

Campos de cada jugador: ver `docs/DATOS.md`.

### Vista `/diseno`

Solo con `npm run dev`. Sirve para probar slider y tarjetas con siluetas rotuladas “VISTA DE DISEÑO”. En Vercel da 404. Eso es correcto.

### WhatsApp flotante

El componente existe. No se pinta sin un número de 10 a 15 dígitos. Mensaje previsto cuando exista: pedir clase muestra.

---

## 6. Identidad visual (no cambiar)

Muestreo del escudo oficial (`assets/logo/escudo.png`):

| Token | Hex | Uso |
|---|---|---|
| Negro | `#0A0A0A` | Fondo |
| Negro alto | `#141414` | Bloques secundarios |
| Dorado | `#ECC14E` | Acento principal, categoría 2012, CTA |
| Dorado profundo | `#D29628` | Halo y degradados |
| Blanco | `#FFFFFF` | Texto |
| Plata | `#C0C0C0` | Solo categoría 2013 |
| Rojo de partido en vivo | Reservado. No usar en la página informativa. |
| Perla (Electrónica Pura) | `#F3EEE4` | Solo el recuadro de ese patrocinador |
| Rojo CADEL | `#C21812` | Recuadro de CADEL |

- Títulos: Barlow Condensed (itálica, extra bold), fallback Arial Narrow / Impact.
- Cuerpo: Inter, fallback Segoe UI / Roboto / Helvetica / Arial.
- Estilo: deportivo, transmisión + eyecatch. Enérgico, pero confiable para familias.
- El escudo no se recolorea ni se deforma.
- Tarjetas de roster: inclinación ~−12°. El jugador queda derecho por contra-inclinación.

---

## 7. Técnica

| Pieza | Detalle |
|---|---|
| Framework | Astro 5 |
| Estilos | Tailwind 4 (`@tailwindcss/vite`) |
| Salida | Estática (`astro build` → `dist/`) |
| Animaciones | Web Animations API + CSS. Sin React, Next.js, Framer Motion ni GSAP |
| Hosting | Vercel Pro, proyecto `allstars-web` |
| Alias de producción | https://allstars-web.vercel.app |
| Rutas de producción | `/` y `/404` |
| PNG público del escudo | `/allstars-fc-escudo.png` |

Archivos clave:

```
src/data/club.ts              datos públicos
src/pages/index.astro         página principal
src/pages/404.astro           error
src/layouts/Base.astro        HTML, SEO, header, footer
src/components/               secciones
src/scripts/                  slider, roster y revelados
src/lib/jugadores.ts          reglas de foto y publicación
assets/logo/escudo.png        escudo oficial
public/allstars-fc-escudo.png copia descargable del escudo
assets/patrocinadores/        logos de marcas
```

El backend del Brief v2 (Supabase + Resend) **queda sin efecto**. Contrato futuro: `docs/API-CONTRATO.md` cuando Elías y David lo definan.

---

## 8. Cómo actualizar un dato en 30 segundos

1. Abre `src/data/club.ts`.
2. Cambia el valor (horario, costo, Facebook, etc.).
3. En local: `npm run dev` y revisa.
4. En Vercel: `npx vercel deploy --prod --yes --scope jorgeluisherediachaveste71-codes-projects`.

Para jugadores: llena `src/data/jugadores.json`, pon fotos autorizadas en `assets/fotos/` y marca `permisoFoto: true`. Sin eso, el público sigue viendo solo el escudo.

---

## 9. Materiales que no se tocan

- `_brief/BRIEF.md` (histórico)
- `assets/logo/escudo.png`
- Logos oficiales ya entregados en `assets/patrocinadores/`

Más detalle de planificación: `docs/PLAN-MAESTRO.md`.

---

## 10. Contenido de este paquete (zip)

Incluye el código fuente, assets oficiales, brief y documentación. **No** incluye `node_modules`, `dist`, caché de Astro ni la carpeta `.vercel`.

Después de descomprimir:

```bash
npm install
npm run dev
```
