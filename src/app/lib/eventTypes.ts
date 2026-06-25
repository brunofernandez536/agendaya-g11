type TipoEvento = {
  id: number
  nombre: string
  descripcion: string
  disponible: boolean
}

type TipoEventoVisible = {
  id: number
  nombre: string
  descripcion: string
}

export function obtenerTiposEventosDisponibles(
  tiposEventos: TipoEvento[]
): TipoEventoVisible[] {
  return tiposEventos
    .filter((tipoEvento) => tipoEvento.disponible)
    .map((tipoEvento) => ({
      id: tipoEvento.id,
      nombre: tipoEvento.nombre,
      descripcion: tipoEvento.descripcion,
    }))
}