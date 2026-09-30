import type { Partido } from '../lib/partidos';

/** Ficticios. Solo los importa la vista de diseño; no entran al sitio público. */
export const partidosDiseno: Partido[] = [
  {
    id: 'diseno-resultado',
    categoria: '2012',
    tipo: 'resultado',
    rival: 'Academia Norte',
    golesFavor: 3,
    golesContra: 1,
    fecha: 'Sábado 20 de Septiembre',
    hora: '10:00 AM',
    cancha: 'Cancha La Raza',
    esLocal: true,
  },
  {
    id: 'diseno-proximo',
    categoria: '2013',
    tipo: 'proximo',
    rival: 'Club del Valle',
    fecha: 'Sábado 4 de Octubre',
    hora: '10:00 AM',
    cancha: 'Cancha La Raza',
    esLocal: true,
  },
];
