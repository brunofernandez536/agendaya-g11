// Estructura simulada de una Reserva
export interface Reserva {
    id: string;
    estado: 'Pendiente' | 'Confirmada';
}

// Simulación de la función que maneja la confirmación
export function confirmarReserva(
    reserva: Reserva,
    enviarEmailFn: () => boolean,
    registrarLogFn: (msg: string) => void
): boolean {

    // Cambiamos el estado a Confirmada
    reserva.estado = 'Confirmada';

    // Intentamos enviar el correo inmediatamente como pide el PO
    const emailEnviado = enviarEmailFn();

    if (!emailEnviado) {
        // Escenario 2: Si falla el envío, registramos en log
        registrarLogFn("ERROR: Falló el envío de correo de notificación automática. Se reintentará en segundo plano.");
    }

    // El flujo de reserva termina exitosamente (true) de todos modos para el cliente
    return true;
}