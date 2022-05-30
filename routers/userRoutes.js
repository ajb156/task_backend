import express from 'express';
const router = express.Router();

import {
  autenticar,
  comprobarToken,
  confirmar,
  nuevoPassword,
  olvidePassword,
  perfil,
  registrar,
} from '../constrollers/UserController.js';

import checkAuth from '../middleware/checkAuth.js';

router.post('/', registrar);
router.post('/autenticar', autenticar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);
router.get('/confirmar/:token', confirmar);

router.get('/perfil', checkAuth, perfil);

export default router;
