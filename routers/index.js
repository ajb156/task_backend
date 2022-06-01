import express from 'express';
const app = express();

import userRoutes from './userRoutes.js';
import proyectoRoutes from './proyectoRouter.js';
import checkAuth from '../middleware/checkAuth.js';

app.use('/usuarios', userRoutes);
app.use('/proyectos', checkAuth, proyectoRoutes);

export default app;
