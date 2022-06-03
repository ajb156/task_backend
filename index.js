import express from 'express';
import cors from 'cors';
import conectarDB from './config/db.js';
import router from './routers/index.js';

import 'dotenv/config';

const app = express();
app.use(express.json());
conectarDB();

app.use(cors);

const whiteList = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callBack) {
    if (whiteList.includes(origin)) {
      callBack(null, true);
    } else {
      callBack(new Error('No permitido por CORS'));
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
