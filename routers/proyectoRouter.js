import express from 'express';
const router = express.Router();

import {
  agregarColaborador,
  editarProyecto,
  eliminarColaborador,
  eliminarProyecto,
  nuevoProyecto,
  obteberTareas,
  obtenerProyecto,
  obtenerProyectos,
} from '../constrollers/ProyectoController.js';

router.get('/', obtenerProyectos);
router.post('/', nuevoProyecto);

router
  .route('/:id')
  .get(obtenerProyecto)
  .put(editarProyecto)
  .delete(eliminarProyecto);

router.get('/tareas/:id', obteberTareas);
router.post('/agregar-colaborador/:id', agregarColaborador);
router.post('/elimanar-colaborador/:id', eliminarColaborador);

export default router;
