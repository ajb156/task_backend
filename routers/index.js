import express from 'express';
const app = express();

/** Routes */
import userRoutes from './userRoutes.js';
import proyectoRoutes from './proyectoRouter.js';
import tareasRoutes from './tareasRoutes.js';

/** Midlewares */
import checkAuth from '../middleware/checkAuth.js';

app.use('/usuarios', userRoutes);
app.use('/proyectos', checkAuth, proyectoRoutes);
app.use('/tareas', checkAuth, tareasRoutes);

export default app;
