import express from "express";
import conectarDB from "./config/db.js";
import router from "./routers/index.js";

import "dotenv/config";

const app = express();
conectarDB();

// Routing
app.use("/api/", router);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Servidor corriendo en: http://${process.env.HOST}:${process.env.PORT}`
  );
});
