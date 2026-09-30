import partidosJson from '../data/partidos.json';

export type CategoriaPartido = '2012' | '2013';
export type TipoPartido = 'resultado' | 'proximo';

export interface Partido {
  id: string;
  categoria: CategoriaPartido;
  tipo: TipoPartido;
  rival: string;
  golesFavor?: number;
  golesContra?: number;
  fecha: string;
  hora: string;
  cancha: string;
  esLocal: boolean;
}

const categorias = new Set<CategoriaPartido>(['2012', '2013']);
const tipos = new Set<TipoPartido>(['resultado', 'proximo']);

function texto(valor: unknown) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

function goles(valor: unknown) {
  return typeof valor === 'number' && Number.isInteger(valor) && valor >= 0;
}

function esPartido(valor: unknown): valor is Partido {
  if (!valor || typeof valor !== 'object') return false;
  const partido = valor as Partido;
  if (!texto(partido.id) || !texto(partido.rival) || !texto(partido.fecha)) return false;
  if (!texto(partido.hora) || !texto(partido.cancha)) return false;
  if (!categorias.has(partido.categoria) || !tipos.has(partido.tipo)) return false;
  if (typeof partido.esLocal !== 'boolean') return false;
  if (partido.tipo === 'resultado') return goles(partido.golesFavor) && goles(partido.golesContra);
  return true;
}

/** Confirmados para el sitio público. Un arreglo vacío oculta la sección en `/`. */
export function partidosDesdeJson() {
  return (Array.isArray(partidosJson) ? partidosJson : []).filter(esPartido);
}

export function partidosPublicos(lista: Partido[] = partidosDesdeJson()) {
  return lista.filter(esPartido);
}

/** Último resultado primero (el final del arreglo) y después los próximos, en orden de carga. */
export function marcador(lista: Partido[]) {
  const validos = partidosPublicos(lista);
  const resultados = validos.filter((partido) => partido.tipo === 'resultado');
  const proximos = validos.filter((partido) => partido.tipo === 'proximo');
  const ultimo = resultados.at(-1);
  const anteriores = resultados.slice(0, -1).reverse();
  return [...(ultimo ? [ultimo] : []), ...anteriores, ...proximos];
}
