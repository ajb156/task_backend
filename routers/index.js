import express from 'express';
const app = express();

import userRoutes from './userRoutes.js';

app.use('/usuarios', userRoutes);

export default app;
