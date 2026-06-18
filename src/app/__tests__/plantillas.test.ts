import { validarPlantilla } from '../lib/plantillas';

describe('Pruebas Unitarias - US_006: Validar Plantillas de Email', () => {

  test('Debería aceptar una plantilla válida con [Fecha] y [Hora]', () => {
    const textoValido = "Hola, tu turno es el [Fecha] a las [Hora]. Te esperamos.";
    const resultado = validarPlantilla(textoValido);

    expect(resultado.valido).toBe(true);
  });

  test('Debería rechazar si falta la variable obligatoria [Fecha]', () => {
    const textoInvalido = "Tu turno es a las [Hora].";
    const resultado = validarPlantilla(textoInvalido);

    expect(resultado.valido).toBe(false);
    expect(resultado.error).toBe('Error: La plantilla debe incluir obligatoriamente la variable [Fecha]');
  });


  test('Debería rechazar si falta la variable obligatoria [Hora]', () => {
    const textoInvalido = "Tu turno es el [Fecha].";
    const resultado = validarPlantilla(textoInvalido);

    expect(resultado.valido).toBe(false);
    expect(resultado.error).toBe('Error: La plantilla debe incluir obligatoriamente la variable [Hora]');
  });

  test('Debería rechazar si el texto supera los 2000 caracteres', () => {
    const textoLargo = "A".repeat(2001);
    const resultado = validarPlantilla(textoLargo);

    expect(resultado.valido).toBe(false);
    expect(resultado.error).toBe('Error: La plantilla supera el límite de 2000 caracteres');
  });
});