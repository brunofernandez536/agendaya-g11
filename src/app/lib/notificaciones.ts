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

export const enviarRecordatorioEmail = async (
  email: string | null, 
  reserva: { fecha: string; hora: string } | null, 
  proveedorCorreos: any
) => {
  if (!email) {
    throw new Error("El correo electrónico del usuario es obligatorio.");
  }

  if (!reserva || !reserva.fecha || !reserva.hora) {
    throw new Error("Los detalles de la reserva son obligatorios.");
  }

  try {
    const respuesta = await proveedorCorreos.send({
      to: email,
      subject: "Recordatorio de tu reserva - AgendaYA",
      body: `Te recordamos que tienes una reserva el ${reserva.fecha} a las ${reserva.hora}.`
    });

    return { success: true, message: "Recordatorio enviado con éxito", data: respuesta };
  } catch (error) {
    throw new Error("Fallo en el servidor de correos. Se reintentará en segundo plano.");
  }
};