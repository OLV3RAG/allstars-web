import partidosJson from '../data/partidos.json';

export type CategoriaPartido = '2012' | '2013' | '2011-2012' | '2013-2014' | '2011 - 2012' | '2013 - 2014';
export type TipoPartido = 'resultado' | 'proximo' | 'finalizado';

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
  estado?: string;
}

const categorias = new Set<CategoriaPartido>(['2012', '2013', '2011-2012', '2013-2014', '2011 - 2012', '2013 - 2014']);
const tipos = new Set<TipoPartido>(['resultado', 'proximo', 'finalizado']);

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
  if (partido.estado !== undefined && !texto(partido.estado)) return false;
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

/** Próximos en orden de carga y, después, los ya jugados. */
export function marcador(lista: Partido[]) {
  const validos = partidosPublicos(lista);
  const proximos = validos.filter((partido) => partido.tipo === 'proximo');
  const jugados = validos.filter((partido) => partido.tipo === 'resultado' || partido.tipo === 'finalizado');
  return [...proximos, ...jugados];
}
