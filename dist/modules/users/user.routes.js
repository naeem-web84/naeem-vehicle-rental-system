"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.authMiddleware, user_controller_1.getAllUsersController);
router.put("/:userId", auth_middleware_1.authMiddleware, user_controller_1.updateUserController);
router.delete("/:userId", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)("admin"), user_controller_1.deleteUserController);
exports.userRoutes = router;
