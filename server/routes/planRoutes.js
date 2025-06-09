import express from "express";
import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Proteger todas las rutas con el middleware
router.use(verifyToken);

//ruta para crear un plan
router.post("/", createPlan);

//ruta para obtener todos los planes
router.get("/", getPlans);

//ruta para obtener un plan por id
router.get("/:id", getPlanById);

//ruta para actualizar un plan
router.put("/:id", updatePlan);

//ruta para eliminar un plan
router.delete("/:id", deletePlan);

export default router;
