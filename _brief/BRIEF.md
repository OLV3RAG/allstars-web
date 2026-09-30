# BRIEF v2 — Sitio web All Stars FC

## 0. Cómo trabajar este proyecto (reglas para Cursor)
- Lee este brief completo y revisa `assets/` antes de proponer nada.
- Trabajamos por FASES. En cada fase: primero propuesta, espera aprobación, luego código.
- No hagas push, deploy, ni crees proyectos en Vercel o Supabase sin autorización.
- Nunca pongas llaves o secretos en el código: todo va en variables de entorno y se documenta en `.env.example`.
- Al terminar cada fase: `npm run build` sin errores, y resumen de qué cambió y cómo probarlo.

### Fases
1. **Base del sitio:** estructura Astro, diseño general, secciones informativas, botón WhatsApp, patrocinadores, ubicación, SEO.
2. **Promociones y cumpleaños** (JSON) + **formulario de inscripción** (función serverless).
3. **Roster** con tarjetas y animación eyecatch.
4. **Centro de Partido** (Supabase: base de datos, tiempo real) — vista pública.
5. **Panel del coach** `/admin` para capturar partidos en vivo desde el celular.

---

## 1. Objetivo
Sitio de All Stars FC (Chihuahua) para conseguir inscripciones y mostrar al equipo de forma profesional: roster y partidos en vivo. El visitante principal son papás y mamás desde el celular.

## 2. Datos del cliente
- Nombre: All Stars FC (CUU)
- Lema: "All Stars FC es más que fútbol. Es equipo, es unión, es amistad."
- Fundada en 2025
- Entrenador: Prof. René Loya (entrenador de la UACH)
- Ubicación: Cancha La Raza, Calle Huitzilopochtli, atrás de la Churubusco, Chihuahua, Chih.
- Edades: de 8 años en adelante. Categorías con roster: 2012 y 2013 [PENDIENTE: confirmar si hay más]
- Horario: miércoles 5:00–6:30 p.m. [PENDIENTE: confirmar otros días]
- Mensualidad: $600 MXN · Inscripción: $0 · Clase muestra: GRATIS
- Patrocinadores: CADEL Sistemas, RASA Centro de Servicio Automotriz, Electrónica Pura y de Servicios
- Liga donde compiten: [PENDIENTE]
- WhatsApp: [PENDIENTE]
- Correo institucional: [PENDIENTE]
- Facebook / Instagram: [PENDIENTE URLs]
- Dominio: [PENDIENTE]

## 3. Assets
- `assets/logo/escudo.png`: escudo oficial, PNG transparente. De aquí sale la paleta.
- `assets/patrocinadores/rasa.svg`: logo RASA en vector (usar este; `rasa.png` es respaldo).
- `assets/patrocinadores/electronica-pura.png`: TEMPORAL, en BLANCO; solo funciona sobre fondo oscuro. Se reemplazará.
- CADEL Sistemas: aún sin logo. Espacio reservado con su nombre en texto, fácil de reemplazar.
- `assets/fotos/`: vacía. Espacios reservados en galería, fáciles de reemplazar.

## 4. Identidad visual
- Paleta del escudo: negro, dorado, blanco. Plata como acento secundario (categoría 2013).
- Estilo: deportivo, moderno, "transmisión de TV + anime". Enérgico pero confiable para papás. Nada de plantilla genérica.
- Tipografía de títulos: condensada, itálica, bold (Barlow Condensed u Oswald vía Google Fonts). Texto: sans legible. Siempre con fallback.

---

## 5. Secciones (página principal)
1. **Hero:** escudo, lema, CTA principal "Agenda tu clase muestra gratis" (WhatsApp) + CTA secundario "Inscríbete".
2. **Partido en vivo / próximo partido:** franja destacada arriba cuando hay partido EN VIVO (ver sección 9). Si no hay, muestra el próximo partido.
3. **Quiénes somos:** historia breve y valores (equipo, unión, amistad).
4. **Entrenador:** Prof. René Loya.
5. **Nuestro Roster:** categorías 2012 y 2013 (ver sección 8).
6. **Centro de Partido:** último resultado, próximos partidos, historial (ver sección 9).
7. **Categorías y horarios.**
8. **Costos:** mensualidad $600, inscripción $0, clase muestra gratis.
9. **Promociones** (JSON).
10. **Cumpleaños del mes** (JSON).
11. **Galería.**
12. **Patrocinadores.**
13. **Ubicación:** mapa embebido de Google Maps + cómo llegar.
14. **Formulario de inscripción.**
15. **Footer:** redes, WhatsApp, correo.

Además, página propia por partido: `/partido/[id]` con el detalle completo.

---

## 6. Llamados a la acción
- Botón flotante de WhatsApp visible en toda la página, respuesta inmediata (sin animaciones que lo retrasen). Mensaje prellenado: "Hola, quiero agendar una clase muestra gratis en All Stars FC".
- Formulario de inscripción: nombre del papá/mamá/tutor, teléfono, nombre del niño/a, año de nacimiento (para categoría), comentario opcional.
  - Función serverless `/api/inscripcion`: valida en cliente y servidor, honeypot anti-spam.
  - Guarda el registro en Supabase (tabla `inscripciones`, solo escritura pública vía la función, lectura solo admins) Y envía correo con Resend. Si el correo falla, el registro queda guardado.
  - Al enviar: mensaje de éxito + botón para continuar por WhatsApp. Si falla todo: error claro + WhatsApp como alternativa.

## 7. Promociones y cumpleaños
- `src/data/promociones.json`: título, descripción, vigencia (desde/hasta). Ocultar vencidas automáticamente.
- `src/data/cumpleanos.json`: SOLO primer nombre y día/mes.
- PRIVACIDAD (menores): nunca apellido, año de nacimiento, ni fotos sin permiso. El JSON no contiene más datos que los publicados.

---

## 8. Roster — presentación tipo eyecatch de anime + transmisión deportiva

### Datos — `src/data/jugadores.json`
- Campos: `id`, `categoria` ("2012" | "2013"), `nombre` (nombre de pila o nombre + inicial del apellido), `numero`, `posicion`, `foto` (PNG recortado sin fondo, opcional), `permisoFoto` (boolean), `activo` (boolean).
- Sin `permisoFoto: true` o sin foto → silueta genérica en colores del club. NUNCA mostrar foto sin permiso.
- Son menores: nada de fecha de nacimiento, apellidos completos ni otros datos personales.

### Sección
- Pestañas "Categoría 2012" y "Categoría 2013". Acento 2012 = dorado, 2013 = plata.

### Tarjeta (paralelogramo)
- Panel alto con skew ~-12°; contenido interno contra-inclinado para que la foto quede recta.
- Fondo negro con degradado a dorado abajo + speed lines diagonales sutiles.
- Número gigante detrás del jugador: outline dorado, semitransparente, recortado por el panel.
- Foto de cuerpo completo sin fondo, más grande que el panel: la cabeza sobresale del borde superior (pop-out). Recorte con clip-path solo abajo y a los lados.
- Franja inferior: nombre en blanco (fuente condensada itálica bold), posición en color de acento, mini escudo.

### Animación (`src/components/Eyecatch.astro` reutilizable + script del roster)
1. Se dispara al entrar la sección en viewport (IntersectionObserver, una vez por pestaña) y al cambiar de pestaña.
2. Eyecatch: 5 paneles verticales negro/dorado/blanco, alternando entrada arriba/abajo, stagger ~60 ms, easing cubic-bezier(0.76, 0, 0.24, 1). Cubre SOLO la sección. Con paneles cerrados: escudo con scale-in + texto "CATEGORÍA 2012/2013".
3. Salen los paneles; las tarjetas entran de izquierda a derecha, stagger ~90 ms, con desenfoque de movimiento que se limpia al llegar. El número entra desde la derecha; la franja del nombre hace wipe de izquierda a derecha.
4. Duración total de entrada ≤ 1.8 s.
5. Reposo: flotación sutil del jugador (2–3 px, loop lento) + destello dorado que recorre UNA tarjeta a la vez, en secuencia, cada ~4 s.
6. Hover (escritorio) / tap (móvil): la tarjeta se ensancha tipo acordeón, el jugador escala ~1.05, las demás bajan brillo/saturación.

### Layout
- Móvil: carrusel horizontal con scroll-snap centrado; tarjeta activa más grande y a color, laterales más chicas y atenuadas; indicador de deslizamiento.
- Escritorio: fila completa de izquierda a derecha; si no caben, dos filas conservando el orden.

---

## 9. Centro de Partido (en vivo)

### Qué ve el público
- **Estados:** Próximo · EN VIVO (badge rojo pulsante) · Medio tiempo · Final · Suspendido.
- **Tarjeta de partido estilo transmisión:** escudo All Stars vs rival (escudo del rival opcional; si no hay, iniciales en un círculo), marcador grande, minuto, categoría, liga/torneo y jornada, cancha, fecha y hora.
- **Minuto calculado en el cliente** a partir de timestamps de inicio de cada tiempo (nunca un contador que dependa de que el admin tenga la pantalla abierta).
- **Línea de tiempo** de eventos: goles (con goleador de All Stars), tarjetas, cambios, medio tiempo, final.
- **Alineación dibujada sobre una cancha** (vista cenital, formación configurable, p. ej. 1-3-3-1) usando mini versiones de las tarjetas del roster. Suplentes debajo.
- **Animación de GOL:** cuando llega un gol en vivo, la tarjeta del partido corre un eyecatch corto (reutilizar Eyecatch.astro) con "¡GOL!" y el nombre del goleador. ≤ 1.5 s. Respeta prefers-reduced-motion.
- **Próximos partidos e historial de resultados** por categoría.
- Actualización en tiempo real sin recargar (Supabase Realtime). Si Realtime falla, polling cada 30 s como respaldo.
- Si no hay conexión con Supabase: la sección muestra un estado vacío elegante; el resto de la página funciona normal.

### Datos — Supabase (PostgreSQL)
- `partidos`: id, categoria, rival, rival_escudo_url (opcional), liga, jornada, cancha, fecha_hora, es_local, estado (`programado | en_vivo | medio_tiempo | finalizado | suspendido`), duracion_tiempo_min (configurable, default [PENDIENTE confirmar con la liga]), inicio_1t, inicio_2t, formacion, alineacion (jsonb: titulares y suplentes por id de jugador), created_at, updated_at.
- `eventos`: id, partido_id, tipo (`gol | gol_rival | amarilla | roja | cambio | inicio_1t | medio_tiempo | inicio_2t | final`), minuto, jugador_id (opcional), jugador_sale_id (para cambios), created_at, created_by.
- El marcador se DERIVA de los eventos (vista o trigger), para que nunca se desincronice. Deshacer = borrar el evento.
- `inscripciones` (ver sección 6).
- `admins`: correos autorizados para capturar.
- RLS obligatorio: lectura pública solo de `partidos` y `eventos`; escritura solo usuarios autenticados que estén en `admins`. `inscripciones` sin lectura pública.
- Jugadores: el panel y la alineación leen `src/data/jugadores.json` (fuente única); en Supabase solo se guardan ids.
- Privacidad: en eventos y alineación solo se muestra el nombre tal como está en jugadores.json.

### Panel del coach — `/admin`
- Login con Supabase Auth (enlace mágico por correo). Solo correos en `admins`.
- Pantalla pensada para usar de pie en la cancha con una mano: botones grandes, alto contraste, sin confirmaciones innecesarias pero con "Deshacer último evento" siempre visible.
- Flujo: crear/editar partido → armar alineación tocando jugadores → Iniciar 1T → +Gol All Stars (elige goleador de la alineación) / +Gol rival / tarjeta / cambio → Medio tiempo → Iniciar 2T → Final.
- Funciona con señal mala: si un envío falla, queda en cola local y se reintenta; indicador visible de "pendiente de enviar".
- `/admin` con noindex y fuera del sitemap.

---

## 10. Stack y despliegue
- Astro + Tailwind. Páginas prerenderizadas (estáticas); solo `/api/*`, `/admin` y `/partido/[id]` con render en servidor si hace falta. Adaptador de Vercel.
- Animaciones: GSAP (npm) o Web Animations API. NO Framer Motion ni React para animaciones.
- Supabase: base de datos, Auth, Realtime. Migraciones SQL versionadas en `supabase/migrations/`.
- Resend para correos.
- Despliegue en Vercel (plan Pro).
- Variables de entorno (documentar en `.env.example`): PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (solo servidor, solo si es indispensable), RESEND_API_KEY, CORREO_DESTINO, PUBLIC_WHATSAPP.

## 11. SEO local
- Title/description orientados a "escuela de fútbol infantil Chihuahua".
- Open Graph con escudo (se ve bien al compartir por WhatsApp/Facebook). Cada `/partido/[id]` con su propio OG (marcador y rival).
- Schema.org SportsOrganization con dirección; SportsEvent para partidos.
- sitemap.xml y robots.txt (excluir /admin).

## 12. Requisitos técnicos
- Mobile-first. Lighthouse ≥ 90 en todas las categorías en la página principal.
- Imágenes optimizadas con el componente de imagen de Astro; lazy loading salvo lo visible al cargar.
- Solo animar transform, opacity y filter (salvo flex-grow en el hover del roster).
- prefers-reduced-motion: sin animaciones, todo visible directamente.
- HTML completo desde el inicio (SEO). Si el JS falla, todo el contenido se ve (nada queda oculto por una animación).
- Accesible: contraste, alt en imágenes, navegación con teclado, estados EN VIVO anunciados con aria-live.

## 13. Entregables
- Código del proyecto con README.md: correr en local, editar promociones/cumpleaños/jugadores, crear el proyecto de Supabase y correr migraciones, dar de alta un admin, capturar un partido, desplegar.
- `.env.example` sin valores reales.
