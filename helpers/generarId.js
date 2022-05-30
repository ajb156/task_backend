/**
 * Metodo para generar ID unico
 * @returns Genera el id para el registro de usuarios
 */

const generarId = () => {
  const random = Math.random().toString(32).substring(2);
  const fecha = Date.now().toString(32);
  return random + fecha;
};

export default generarId;
