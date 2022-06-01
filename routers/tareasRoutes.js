import express from 'express';
const router = express.Router();

/** Acciones del controlador */
import {
  actualizarTarea,
  agregarTarea,
  cambiarEstadoTarea,
  eliminarTarea,
  obtenerTarea,
} from '../constrollers/TareaController.js';

/** Rutas de tarea */
router.post('/', agregarTarea);

router.post('/estado/:id', cambiarEstadoTarea);

router
  .route('/:id')
  .get(obtenerTarea)
  .put(actualizarTarea)
  .delete(eliminarTarea);

export default router;
