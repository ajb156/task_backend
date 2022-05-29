import express from "express";
const app = express();

import userRoutes from "./userRoutes.js";

app.use("/users", userRoutes);

export default app;
