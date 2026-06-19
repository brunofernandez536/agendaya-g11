
import { enviarNotificacionCancelacion, Reserva } from '../lib/notificaciones';

describe('US_007: Notificación vía E-mail por cancelación de reserva', () => {
  
  // Escenario 1: Envío exitoso ante cancelación
  test('Debería enviar el email con los datos correctos si la reserva está cancelada', () => {
    const reservaCancelada: Reserva = {
      id: 'RES-137',
      emailInvitado: 'nataliadiaz@gmail.com',
      estado: 'Cancelado'
    };

    const resultado = enviarNotificacionCancelacion(reservaCancelada);

    expect(resultado.enviado).toBe(true);
    expect(resultado.destinatario).toBe('nataliadiaz@gmail.com');
    expect(resultado.asunto).toContain('cancelada');
  });

  // Escenario 2: No enviar si la reserva sigue activa
  test('No debería enviar el email si la reserva no está en estado cancelado', () => {
    const reservaActiva: Reserva = {
      id: 'RES-138',
      emailInvitado: 'juangomez@gmail.com',
      estado: 'Confirmado'
    };

    const resultado = enviarNotificacionCancelacion(reservaActiva);

    expect(resultado.enviado).toBe(false);
  });

  // Escenario 3: Validación preventiva de estructura
  test('Debería lanzar un error si el email del invitado es inválido o está vacío', () => {
    const reservaErronea: Reserva = {
      id: 'RES-139',
      emailInvitado: 'facundogmail.com', // Email sin '@'
      estado: 'Cancelado'
    };

    expect(() => enviarNotificacionCancelacion(reservaErronea)).toThrow("Email inválido");
  });
});