import { confirmarReserva, Reserva } from '../lib/usuarios';

describe('US_002: Notificación de confirmación de reserva por parte del cliente', () => {

    // Test 1: Escenario 1 - Recepción del correo
    test('Debe intentar enviar el correo inmediatamente cuando la reserva cambia a Confirmada', () => {
        const miReserva: Reserva = { id: 'RES-001', estado: 'Pendiente' };
        let mailInvocado = false;

        // Simulamos que el servidor de correo funciona bien (devuelve true)
        const mockEnviarEmail = () => {
            mailInvocado = true;
            return true;
        };
        const mockRegistrarLog = () => {};

        confirmarReserva(miReserva, mockEnviarEmail, mockRegistrarLog);

        expect(miReserva.estado).toBe('Confirmada');
        expect(mailInvocado).toBe(true); // Verifica que se intentó enviar
    });

    // Test 2: Escenario 2 (Parte 1) - Fallo en el envío pero flujo exitoso
    test('El flujo de reserva debe terminar exitosamente aunque falle el servidor de correo', () => {
        const miReserva: Reserva = { id: 'RES-002', estado: 'Pendiente' };

        // Simulamos que el servidor de correo falla (devuelve false)
        const mockEnviarEmailFalla = () => false;
        const mockRegistrarLog = () => {};

        const resultadoFlujo = confirmarReserva(miReserva, mockEnviarEmailFalla, mockRegistrarLog);

        // El criterio pide que el flujo termine exitosamente de todos modos
        expect(resultadoFlujo).toBe(true);
    });

    // Test 3: Escenario 2 (Parte 2) - Registro del error en Log
    test('Debe registrar el error en un log si el servidor de correo falla', () => {
        const miReserva: Reserva = { id: 'RES-003', estado: 'Pendiente' };
        let logMensaje = '';

        const mockEnviarEmailFalla = () => false;
        // Capturamos el log para verificar que se escriba el error
        const mockRegistrarLog = (msg: string) => {
            logMensaje = msg;
        };

        confirmarReserva(miReserva, mockEnviarEmailFalla, mockRegistrarLog);

        expect(logMensaje).toContain('ERROR'); // Verifica que se registró la falla
    });
});