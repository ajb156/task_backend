import express from 'express';
import cors from 'cors';
import conectarDB from './config/db.js';
import router from './routers/index.js';

import 'dotenv/config';

const app = express();
app.use(express.json());
conectarDB();

const whiteList = ['*'];
const corsOptions = {
  origin: function (origin, callBack) {
    console.log(origin);
    if (whiteList.includes(origin)) {
      callBack(null, true);
    } else {
      callBack(new Error('No permitido por CORS'));
    }
  },
};

app.use(cors());

// Routing
app.use('/api', router);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Servidor corriendo en: http://${process.env.HOST}:${process.env.PORT}`
  );
});
