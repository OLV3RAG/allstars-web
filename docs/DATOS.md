# Datos públicos y archivos de contenido

## Club

Los datos que se muestran en el sitio (nombre, lema, costos, horario, sede, Facebook, patrocinadores) viven en `src/data/club.ts`. No los copies en componentes.

Para incorporar WhatsApp más adelante:

1. Confirma el número.
2. Escríbelo en `club.whatsapp` (solo dígitos, con código de país, 10 a 15 caracteres) o en `PUBLIC_WHATSAPP` cuando se conecte esa variable.
3. El sitio solo mostrará acciones de WhatsApp si el número pasa la validación. Sin número válido no se renderiza el botón flotante.

## Roster — `src/data/jugadores.json`

Arreglo de jugadores. Hoy está vacío. No inventar integrantes.

Campos:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | Identificador estable |
| `categoria` | `"2012"` \| `"2013"` | |
| `nombre` | string | Solo nombre de pila, o nombre + inicial del apellido |
| `numero` | number | Número de camiseta |
| `posicion` | string | Posición de juego |
| `foto` | string, opcional | PNG recortado de cuerpo completo, sin fondo, en `assets/fotos/` |
| `fotoPortada` | string, opcional | Recorte extra de rostro y torso para el slider. No duplica al jugador |
| `encuadrePortada` | string, opcional | `object-position` CSS, por ejemplo `center 18%`, si hay que subir el rostro |
| `permisoFoto` | boolean | Autorización explícita para publicar la foto |
| `activo` | boolean | Si es `false`, no se publica |

La identidad del jugador vive en un solo objeto. `fotoPortada` solo cambia el encuadre de la portada.

Reglas de privacidad (menores):

- No publicar apellidos completos, fechas de nacimiento ni otros datos personales.
- Mostrar fotografía únicamente cuando `permisoFoto === true` y exista el archivo.
- En cualquier otro caso, silueta genérica con colores del club.
- No colocar fotografías sin autorización en `assets/` ni en `public/`.

Mientras `jugadores.json` esté vacío, el sitio público no muestra roster ni diapositivas de jugadores. En desarrollo, `/diseno` permite revisar tarjetas y el slider con siluetas rotuladas “VISTA DE DISEÑO”. Esa ruta no entra en la compilación de producción.

Coloca las fotos autorizadas en `assets/fotos/` y escribe solo el nombre del archivo en `foto` o `fotoPortada`. Sin `permisoFoto: true` o sin archivo, se muestra una silueta.

## Promociones — `src/data/promociones.json`

Arreglo vacío. Campos previstos: `titulo`, `descripcion`, `desde`, `hasta`. Las vencidas no se publican.

## Cumpleaños — `src/data/cumpleanos.json`

Arreglo vacío. Solo primer nombre y día/mes, con autorización. Sin apellido ni año de nacimiento.

Mientras estos archivos estén vacíos, el sitio no muestra esas secciones ni enlaces hacia ellas.
