import { obtenerTurnosDisponibles, Turno } from '../lib/turnos';

describe('US_014: Visualizar solamente turnos disponibles', () => {

  // Escenario 1: Retorno exitoso de turnos disponibles
  test('Debería retornar únicamente los turnos con estado "Disponible" de una lista mixta', () => {
    const listaTurnos: Turno[] = [
      { id: 'T-001', actividad: 'Spinning', fecha: '2026-06-20', hora: '09:00', estado: 'Disponible' },
      { id: 'T-002', actividad: 'Yoga', fecha: '2026-06-20', hora: '10:30', estado: 'Reservado' },
      { id: 'T-003', actividad: 'Pilates', fecha: '2026-06-20', hora: '12:00', estado: 'Disponible' },
      { id: 'T-004', actividad: 'Crossfit', fecha: '2026-06-20', hora: '15:00', estado: 'Cancelado' }
    ];

    const resultado = obtenerTurnosDisponibles(listaTurnos);

    expect(resultado).toHaveLength(2);
    expect(resultado[0].id).toBe('T-001');
    expect(resultado[1].id).toBe('T-003');
    expect(resultado.every(turno => turno.estado === 'Disponible')).toBe(true);
  });

  // Escenario 2: Lista sin turnos disponibles
  test('Debería retornar un arreglo vacío si todos los turnos están Reservados o Cancelados', () => {
    const listaTurnos: Turno[] = [
      { id: 'T-002', actividad: 'Yoga', fecha: '2026-06-20', hora: '10:30', estado: 'Reservado' },
      { id: 'T-004', actividad: 'Crossfit', fecha: '2026-06-20', hora: '15:00', estado: 'Cancelado' }
    ];

    const resultado = obtenerTurnosDisponibles(listaTurnos);

    expect(resultado).toHaveLength(0);
    expect(resultado).toEqual([]);
  });

  // Escenario 3: Validación preventiva ante parámetros inválidos
  test('Debería lanzar un error si la lista provista es nula, indefinida o no es un arreglo', () => {
    // @ts-expect-error - Probando comportamiento ante tipos incorrectos en runtime
    expect(() => obtenerTurnosDisponibles(null)).toThrow("Lista de turnos inválida");
    
    // @ts-expect-error - Probando comportamiento ante tipos incorrectos en runtime
    expect(() => obtenerTurnosDisponibles(undefined)).toThrow("Lista de turnos inválida");
    
    // @ts-expect-error - Probando comportamiento ante tipos incorrectos en runtime
    expect(() => obtenerTurnosDisponibles("no-un-arreglo")).toThrow("Lista de turnos inválida");
  });
});
