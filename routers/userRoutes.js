import express from "express";
const router = express.Router();

import {  registrar } from "../constrollers/UserController.js";

router.get("/", registrar);

export default router;
