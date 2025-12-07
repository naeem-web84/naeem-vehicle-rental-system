import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { createBookingController, getBookingsController, updateBookingController } from "./booking.controller";

const router = express.Router();

router.post("/", authMiddleware, createBookingController);

router.get("/", authMiddleware, getBookingsController);

router.put("/:bookingId", authMiddleware, updateBookingController);

export const bookingRoutes = router;
