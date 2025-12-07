"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authMiddleware, booking_controller_1.createBookingController);
router.get("/", auth_middleware_1.authMiddleware, booking_controller_1.getBookingsController);
router.put("/:bookingId", auth_middleware_1.authMiddleware, booking_controller_1.updateBookingController);
exports.bookingRoutes = router;
