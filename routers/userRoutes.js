import express from "express";
const router = express.Router();

import { crearUsuario } from "../constrollers/UserController.js";

router.get("/", crearUsuario);

export default router;
