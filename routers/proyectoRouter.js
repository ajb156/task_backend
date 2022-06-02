import express from 'express';
const router = express.Router();

import {
  agregarColaborador,
  editarProyecto,
  eliminarColaborador,
  eliminarProyecto,
  nuevoProyecto,
  obtenerProyecto,
  obtenerProyectos,
} from '../constrollers/ProyectoController.js';

/** Rutas de proyectos */
router.get('/', obtenerProyectos);
router.post('/', nuevoProyecto);

router
  .route('/:id')
  .get(obtenerProyecto)
  .put(editarProyecto)
  .delete(eliminarProyecto);

router.post('/agregar-colaborador/:id', agregarColaborador);
router.post('/elimanar-colaborador/:id', eliminarColaborador);

export default router;
