import Usuario from "../models/Usuario.js";

export const registrar = async (req, res) => {

  // Verificar que el email no exista
  const {email} = req.body;

  try {
    const usuario = new Usuario(req.body);
    usuario.save();
  } catch (error) {
    console.log(error)
  }




  res.status(200).json({
    msg: "Hola Munod",
  });
};
