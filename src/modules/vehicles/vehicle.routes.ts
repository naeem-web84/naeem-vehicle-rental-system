import express from "express";
import {
  addVehicleController,
  deleteVehicleController,
  getAllVehiclesController,
  getVehicleByIdController,
  updateVehicleController,
} from "./vehicle.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

const router = express.Router();


router.get("/", getAllVehiclesController);
router.get("/:vehicleId", getVehicleByIdController);

 
router.post("/", authMiddleware, roleMiddleware("admin"), addVehicleController);
router.put("/:vehicleId", authMiddleware, roleMiddleware("admin"), updateVehicleController);
router.delete("/:vehicleId", authMiddleware, roleMiddleware("admin"), deleteVehicleController);

export const vehicleRoutes = router;
