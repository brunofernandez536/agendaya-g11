export interface Turno {
  id: string;
  actividad: string;
  fecha: string;      // Formato YYYY-MM-DD
  hora: string;       // Formato HH:MM
  estado: 'Disponible' | 'Reservado' | 'Cancelado';
}

/**
 * Filtra una lista de turnos para retornar únicamente aquellos que están disponibles.
 * Lanza un error si la lista de turnos provista es nula o inválida.
 */
export function obtenerTurnosDisponibles(turnos: Turno[]): Turno[] {
  if (!turnos || !Array.isArray(turnos)) {
    throw new Error("Lista de turnos inválida");
  }

  return turnos.filter(turno => turno.estado === 'Disponible');
}
