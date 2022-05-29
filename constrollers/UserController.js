import Usuario from "../models/Usuario.js";



export const crearUsuario = async (req, res) => {
  res.status(200).json({
    msg: "Hola Munod",
  });
};
