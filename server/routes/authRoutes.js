import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/signup", signup);

// Ruta para iniciar sesión
router.post("/login", login);

export default router;
