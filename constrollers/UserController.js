import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

/**
 * Registro de usuarios
 * @param {nombre} req nombre
 * @param {email} req email unico
 */
export const registrar = async (req, res) => {
  // Verificar que el email no exista
  const { email } = req.body;
  const existe = await Usuario.findOne({ email });

  // Si el usuario existe
  if (existe) {
    const error = new Error('Este usuario ya esta registrado');
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const user = await usuario.save();

    res.status(200).json({
      msg: 'Usuario registrado Correctamente',
      user,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'El usario no se pudo registar',
    });
  }
};

/**
 * Autenticar un usuario y generar token
 * @param {nombre} req nombre
 * @param {email} req email
 * @returns users & token
 */
export const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  // Comprobar que este registrado
  if (!usuario) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({
      msg: error.message,
    });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error('La cuenta no ha sido confirmada');
    return res.status(403).json({
      msg: error.message,
    });
  }

  // Comprobar el password
  if (await usuario.comprobarPassword(password)) {
    res.status(200).json({
      usuario,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error('No se pudo autenticar');
    return res.status(403).json({
      msg: error.message,
    });
  }
};

/**
 * Confirmar la cuenta
 */
export const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ token });

  if (!usuario) {
    const error = new Error('No se pudo confirmar la cuenta, token invalido');
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    usuario.confirmado = true;
    usuario.token = '';
    await usuario.save();

    res.status(200).json({
      msg: 'Cuenta Confirmada',
    });
  } catch (error) {}
};

/**
 * Funcion para restablecer el password
 */
export const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ token });

  if (!usuario) {
    const error = new Error('La cuenta no existe');
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.status(200).json({
      message: 'Hemos enviado un email con las instrucciones',
    });
  } catch (error) {
    res.status(403).json({
      msg: error.message,
    });
  }
};

/**
 * Comprobar token para cambiar password
 */
export const comprobarToken = async (req, res) => {
  const { token } = req.params;

  // Buscamos el usuario con el token
  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    res.status(200).json({
      msg: 'Token valido',
    });
  } else {
    const error = new Error('Token invalido');
    return res.status(404).json({
      msg: error.message,
    });
  }
};

/**
 *  Actualizar el password
 */
export const nuevoPassword = async () => {
  const { token } = req.params;
  const { password } = req.body;
  // Buscamos el usuario con el token
  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    usuario.password = password;
    usuario.token = '';
    await usuario.save();

    res.status(200).json({
      msg: 'Password Actualizado',
    });
  } else {
    const error = new Error('Token invalido');
    return res.status(404).json({
      msg: error.message,
    });
  }
};

export const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};
