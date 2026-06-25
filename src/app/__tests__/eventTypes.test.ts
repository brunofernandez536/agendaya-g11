import { obtenerTiposEventosDisponibles } from '../lib/eventTypes'

describe('US_009 - Visualizar tipos de eventos disponibles', () => {
  test('debe mostrar únicamente los tipos de eventos disponibles', () => {
    const tiposEventos = [
      {
        id: 1,
        nombre: 'Consulta médica',
        descripcion: 'Turno para atención médica general',
        disponible: true,
      },
      {
        id: 2,
        nombre: 'Entrevista inicial',
        descripcion: 'Primera entrevista con el profesional',
        disponible: false,
      },
      {
        id: 3,
        nombre: 'Control nutricional',
        descripcion: 'Seguimiento con nutricionista',
        disponible: true,
      },
    ]

    const resultado = obtenerTiposEventosDisponibles(tiposEventos)

    expect(resultado).toHaveLength(2)
    expect(resultado).toEqual([
      {
        id: 1,
        nombre: 'Consulta médica',
        descripcion: 'Turno para atención médica general',
      },
      {
        id: 3,
        nombre: 'Control nutricional',
        descripcion: 'Seguimiento con nutricionista',
      },
    ])
  })

  test('debe devolver los datos necesarios para visualizar cada tipo de evento', () => {
    const tiposEventos = [
      {
        id: 1,
        nombre: 'Consulta médica',
        descripcion: 'Turno para atención médica general',
        disponible: true,
      },
    ]

    const resultado = obtenerTiposEventosDisponibles(tiposEventos)

    expect(resultado[0]).toHaveProperty('id')
    expect(resultado[0]).toHaveProperty('nombre')
    expect(resultado[0]).toHaveProperty('descripcion')
    expect(resultado[0]).not.toHaveProperty('disponible')
  })

  test('debe devolver una lista vacía si no existen tipos de eventos disponibles', () => {
    const tiposEventos = [
      {
        id: 1,
        nombre: 'Consulta médica',
        descripcion: 'Turno para atención médica general',
        disponible: false,
      },
      {
        id: 2,
        nombre: 'Control nutricional',
        descripcion: 'Seguimiento con nutricionista',
        disponible: false,
      },
    ]

    const resultado = obtenerTiposEventosDisponibles(tiposEventos)

    expect(resultado).toEqual([])
  })
})