import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import conectarDB from './config/db.js';
import router from './routers/index.js';

import 'dotenv/config';

const app = express();
app.use(express.json());
conectarDB();

const whitelist = [process.env.FRONT_HOST];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
};

//app.use(cors(corsOptions));
app.use(cors());

// Routing
app.use('/api', router);

const servidor = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Servidor corriendo en: http://${process.env.HOST}:${process.env.PORT}`
  );
});

// Sockect IO
const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONT_HOST,
  },
});

io.on('connection', (socket) => {
  console.log('Conectado a Socket');
  // Definir los eventos
});
