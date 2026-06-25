
import { enviarNotificacionCancelacion, Reserva } from '../lib/notificaciones';
import { enviarRecordatorioEmail } from '../lib/notificaciones';


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

describe('US_008 - Recordatorio de reserva vía E-mail', () => {
  const mockProveedorExitoso = {
    send: jest.fn().mockResolvedValue({ status: 'enviado' })
  };
  const mockProveedorFallo = {
    send: jest.fn().mockRejectedValue(new Error('Timeout'))
  };
  const reservaValida = { fecha: '2026-06-25', hora: '14:30' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Prueba 1 
  it('Debe enviar el recordatorio exitosamente si los datos son correctos', async () => {
    const result = await enviarRecordatorioEmail('invitado@agendaya.com', reservaValida, mockProveedorExitoso);
    expect(mockProveedorExitoso.send).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
  });

  // Prueba 2 
  it('Debe arrojar un error si falta el correo electrónico', async () => {
    await expect(enviarRecordatorioEmail(null, reservaValida, mockProveedorExitoso))
      .rejects.toThrow('El correo electrónico del usuario es obligatorio.');
    expect(mockProveedorExitoso.send).not.toHaveBeenCalled();
  });

  // Prueba 3: Simulacion de fallo del proveedor
  it('Debe manejar fallos de infraestructura del proveedor de correos', async () => {
    await expect(enviarRecordatorioEmail('invitado@agendaya.com', reservaValida, mockProveedorFallo))
      .rejects.toThrow('Fallo en el servidor de correos. Se reintentará en segundo plano.');
  });
});