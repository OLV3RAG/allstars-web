export const club = {
  nombre: 'All Stars FC',
  ciudad: 'Chihuahua, Chihuahua',
  ciudadCorta: 'Chihuahua',
  fundacion: 2025,
  lema: 'All Stars FC es más que fútbol. Es equipo, es unión, es amistad.',
  entrenador: {
    nombre: 'Prof. René Loya',
    cargo: 'Entrenador de la UACH',
  },
  sede: {
    nombre: 'Cancha La Raza',
    calle: 'Calle Huitzilopochtli',
    referencia: 'atrás de la Churubusco',
    ciudad: 'Chihuahua, Chih.',
  },
  edadesDesde: 8,
  categorias: [
    { id: '2012', nombre: 'Categoría 2012', acento: 'dorado' as const },
    { id: '2013', nombre: 'Categoría 2013', acento: 'plata' as const },
  ],
  horarios: [
    { dia: 'Miércoles', hora: '5:00–6:30 p.m.' },
    { dia: 'Viernes', hora: '4:30–6:00 p.m.' },
  ],
  costos: {
    mensualidadMxn: 600,
    inscripcionMxn: 0,
    claseMuestraGratis: true,
  },
  facebook: 'https://www.facebook.com/AllStarsFcChihuahua',
  whatsapp: '',
  correo: '',
  patrocinadores: [
    { id: 'rasa', nombre: 'RASA Centro de Servicio Automotriz', logo: 'rasa' as const },
    { id: 'electronica-pura', nombre: 'Electrónica Pura y de Servicios', logo: 'electronica-pura' as const },
    { id: 'cadel', nombre: 'CADEL Sistemas', logo: 'cadel' as const },
    { id: 'oscar-garcia', nombre: 'Dr. Oscar Adrián García Ballesteros', logo: 'oscar-garcia' as const },
  ],
} as const;

export const seo = {
  title: 'All Stars FC | Escuela de fútbol infantil en Chihuahua',
  description:
    'All Stars FC es un equipo de fútbol infantil en Chihuahua. Clase muestra gratis, inscripción sin costo y mensualidad de $600. Categorías 2012 y 2013.',
};

export function direccionCompleta() {
  return `${club.sede.nombre}, ${club.sede.calle}, ${club.sede.referencia}, ${club.sede.ciudad}`;
}

export function mapsSearchUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionCompleta())}`;
}

export function mensualidadLabel() {
  return `$${club.costos.mensualidadMxn} al mes`;
}

export function inscripcionLabel() {
  return club.costos.inscripcionMxn === 0 ? 'Inscripción gratis' : `Inscripción $${club.costos.inscripcionMxn}`;
}

export function edadesLabel() {
  return `Desde los ${club.edadesDesde} años`;
}

export function franjaInformativa() {
  return `${mensualidadLabel()} · ${inscripcionLabel()} · ${edadesLabel()}`;
}

export function horarioCorto() {
  return club.horarios.map((sesion) => `${sesion.dia} ${sesion.hora}`).join(' · ');
}

export function horarioInformado() {
  return club.horarios.map((sesion) => `${sesion.dia.toLowerCase()} de ${sesion.hora}`).join(' y ');
}

export function whatsappValido() {
  const desdeEntorno = String(import.meta.env.PUBLIC_WHATSAPP ?? '').trim();
  const numero = desdeEntorno || club.whatsapp.trim();
  return /^\d{10,15}$/.test(numero) ? numero : null;
}

export function whatsappUrl(mensaje: string) {
  const numero = whatsappValido();
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
