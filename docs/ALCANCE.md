# Alcance del sitio All Stars FC

Este documento registra el alcance aprobado para la implementación. Sustituye, para decisiones de producto y backend, lo indicado en `_brief/BRIEF.md` (Brief v2) cuando haya diferencia.

## Fase 1 — aprobada e implementada

Base visual del sitio oficial: página principal informativa, navegable en local, adaptada a móvil y escritorio.

Incluye:

- Identidad del club, portada con el escudo oficial, club y entrenador, categorías, horario informado, costos, patrocinadores, ubicación y contacto por Facebook.
- Datos públicos centralizados en `src/data/club.ts`.
- Archivos vacíos de roster, promociones y cumpleaños.
- Estructura del slider de portada y sección de roster. Sin jugadores reales, el público solo ve la diapositiva del escudo. La vista `/diseno` existe únicamente en `npm run dev`.
- Página 404.

La planificación vigente (orden de pasos, estado de animaciones y adaptación de efectos) está en `docs/PLAN-MAESTRO.md`.

No incluye aún:

- Verificación interactiva de animaciones (paso 2 del plan maestro).
- Formulario de inscripción, envío de correos o captura de datos personales.
- Centro de Partido, panel del coach, autenticación o backend.
- Página de aviso de privacidad con carácter definitivo. Falta el responsable y los datos de contacto institucionales. Queda pendiente antes de recoger datos personales.
- Botón flotante de WhatsApp, hasta que exista un número válido.

## Backend — decisión abierta

El Brief v2 proponía Supabase, Resend y Vercel como stack de datos y correo.

Esa elección **queda sin efecto**. El backend lo definirán Elías y David. El sitio no asume Supabase, Firebase ni otro proveedor.

Los datos dinámicos futuros se leerán a través de `src/lib/datos/` y un contrato en `docs/API-CONTRATO.md`. En desarrollo podrá usarse un simulador. En producción no se presentarán partidos ficticios como reales.

La Fase 1 no implementa esa capa: solo deja la decisión documentada.

## Materiales que no se alteran

- `_brief/BRIEF.md`
- `assets/logo/escudo.png`
- Logos oficiales de patrocinadores en `assets/patrocinadores/`
