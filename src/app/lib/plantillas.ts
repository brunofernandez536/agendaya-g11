interface ResultadoValidacion {
    valido: boolean;
    error?: string;
}

export function validarPlantilla(texto: string): ResultadoValidacion {

    if (texto.length > 2000) {
        return {
            valido: false,
            error: 'Error: La plantilla supera el límite de 2000 caracteres'
        };
    }


    if (!texto.includes('[Fecha]')) {
        return {
            valido: false,
            error: 'Error: La plantilla debe incluir obligatoriamente la variable [Fecha]'
        };
    }


    if (!texto.includes('[Hora]')) {
        return {
            valido: false,
            error: 'Error: La plantilla debe incluir obligatoriamente la variable [Hora]'
        };
    }

    return { valido: true };
}