import Proyecto from '../models/Proyecto.js';

/**
 * Obtener los proyectos del usuario
 */
export const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
  res.json(proyectos);
};

/**
 * Nuevo proyecto
 */
export const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const newProyecto = await proyecto.save();
    res.status(200).json({ newProyecto });
  } catch (error) {
    return res.status(404).json({
      msg: error.message,
    });
  }
};

export const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error('No encontrado');
    return res.status(404).json({
      msg: error.message,
    });
  }

  // Comprobamos que el usuario autenticado sea el que creo el proyecto
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida');
    return res.status(402).json({
      msg: error.message,
    });
  }

  res.json(proyecto);
};

export const editarProyecto = async (req, res) => {};

export const eliminarProyecto = async (req, res) => {};

export const agregarColaborador = async (req, res) => {};

export const eliminarColaborador = async (req, res) => {};

export const obteberTareas = async (req, res) => {};
