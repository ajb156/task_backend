import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

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

/**
 * Muestra un proyecto
 * @param {id} req id proyecto
 * @returns proyecto
 */
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

  // Obtener tareas del proyecto
  // Traeamos las tareas asociadas al proyecto
  const tareas = await Tarea.find().where('proyectos').equals(proyecto._id);
  proyecto.tareas = tareas;

  res.status(200).json({ proyecto, tareas });
};

export const editarProyecto = async (req, res) => {
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

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const updateProyect = await proyecto.save();
    res.json({ updateProyect });
  } catch (error) {
    console.log(error);
  }
};

export const eliminarProyecto = async (req, res) => {
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

  try {
    await proyecto.deleteOne();
    res.status(200).json({
      msg: 'Proyecto eliminado',
    });
  } catch (error) {
    console.log(error);
  }
};



export const agregarColaborador = async (req, res) => {};

export const eliminarColaborador = async (req, res) => {};
