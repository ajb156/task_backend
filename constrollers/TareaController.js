import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

export const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);

  // Comprobamos que el proyecto exista
  if (!existeProyecto) {
    const error = new Error('El proyecto no existe');
    return res.status(404).json({
      msg: error.message,
    });
  }

  // Comprobamos que este autorizado a crear tareas
  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('No tienes permiso para añadir tareas');
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    tareaAlmacenada.save();

    res.status(200).json({
      tareaAlmacenada,
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate('proyecto');
  const { proyecto } = tarea;

  // Comprobamos que el usuario autenticado sea el que creo el proyecto
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida');
    return res.status(402).json({
      msg: error.message,
    });
  }

  res.json(tarea);
};

export const actualizarTarea = async (req, res) => {};

export const eliminarTarea = async (req, res) => {};

export const cambiarEstadoTarea = async (req, res) => {};
