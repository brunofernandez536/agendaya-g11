export interface Reserva {
  id: string;
  emailInvitado: string;
  estado: 'Confirmado' | 'Cancelado';
}

export interface EmailResultado {
  enviado: boolean;
  destinatario: string;
  asunto: string;
  cuerpo: string;
}

// Función que procesa la notificación de cancelación
export function enviarNotificacionCancelacion(reserva: Reserva): EmailResultado {
  if (!reserva.emailInvitado || !reserva.emailInvitado.includes('@')) {
    throw new Error("Email inválido");
  }
  
  if (reserva.estado !== 'Cancelado') {
    return { enviado: false, destinatario: reserva.emailInvitado, asunto: "", cuerpo: "" };
  }

  return {
    enviado: true,
    destinatario: reserva.emailInvitado,
    asunto: "Tu reserva ha sido cancelada",
    cuerpo: `Hola! Tu reserva con ID ${reserva.id} ha sido cancelada.`
  };
}