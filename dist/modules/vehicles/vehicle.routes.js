"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = express_1.default.Router();
router.get("/", vehicle_controller_1.getAllVehiclesController);
router.get("/:vehicleId", vehicle_controller_1.getVehicleByIdController);
router.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)("admin"), vehicle_controller_1.addVehicleController);
router.put("/:vehicleId", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)("admin"), vehicle_controller_1.updateVehicleController);
router.delete("/:vehicleId", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)("admin"), vehicle_controller_1.deleteVehicleController);
exports.vehicleRoutes = router;
