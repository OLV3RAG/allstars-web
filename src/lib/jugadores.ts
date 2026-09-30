import type { ImageMetadata } from 'astro';
import jugadoresJson from '../data/jugadores.json';

export type Categoria = '2012' | '2013';

export interface Jugador {
  id: string;
  categoria: Categoria;
  nombre: string;
  numero: number;
  posicion: string;
  foto?: string;
  fotoPortada?: string;
  encuadrePortada?: string;
  permisoFoto: boolean;
  activo: boolean;
}

const catalogo = import.meta.glob<{ default: ImageMetadata }>(
  '../../assets/fotos/**/*.{png,webp,jpg,jpeg}',
  { eager: true },
);

export function jugadoresDesdeJson() {
  return jugadoresJson as Jugador[];
}

export function jugadoresPublicos(lista: Jugador[] = jugadoresDesdeJson()) {
  return lista.filter((jugador) => jugador.activo);
}

function archivoFoto(nombre?: string) {
  if (!nombre) return undefined;
  const clave = Object.keys(catalogo).find(
    (ruta) => ruta.endsWith(`/${nombre}`) || ruta.endsWith(nombre),
  );
  return clave ? catalogo[clave].default : undefined;
}

export function imagenRoster(jugador: Jugador) {
  if (!jugador.permisoFoto) return undefined;
  return archivoFoto(jugador.foto);
}

export function imagenPortada(jugador: Jugador) {
  if (!jugador.permisoFoto) return undefined;
  return archivoFoto(jugador.fotoPortada) ?? archivoFoto(jugador.foto);
}

export function puedeMostrarFoto(jugador: Jugador) {
  return Boolean(imagenRoster(jugador) || imagenPortada(jugador));
}

export function jugadoresConRetrato(lista: Jugador[] = jugadoresPublicos()) {
  return lista.filter((jugador) => imagenPortada(jugador));
}

export function porCategoria(lista: Jugador[], categoria: Categoria) {
  return lista.filter((jugador) => jugador.categoria === categoria);
}
