import express from 'express';
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

app.use(cors(corsOptions));

// Routing
app.use('/api', router);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Servidor corriendo en: http://${process.env.HOST}:${process.env.PORT}`
  );
});
