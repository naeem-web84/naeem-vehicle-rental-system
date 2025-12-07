import express from "express";
import { deleteUserController, getAllUsersController, updateUserController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

const router = express.Router();

 
router.get("/", authMiddleware, getAllUsersController);

 
router.put("/:userId", authMiddleware, updateUserController);

 
router.delete("/:userId", authMiddleware, roleMiddleware("admin"), deleteUserController);

export const userRoutes = router;
