"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingController = exports.getBookingsController = exports.createBookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBookingController = async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        const booking = await (0, booking_service_1.createBooking)({ ...req.body, customer_id: user.id });
        res.status(201).json({ booking });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createBookingController = createBookingController;
const getBookingsController = async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        const bookings = await (0, booking_service_1.getBookings)(user);
        res.status(200).json({ bookings });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getBookingsController = getBookingsController;
const updateBookingController = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        if (!bookingId)
            return res.status(400).json({ message: "Booking ID required" });
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        const action = req.body.action;
        if (!action)
            return res.status(400).json({ message: "Action required (cancel/return)" });
        const updatedBooking = await (0, booking_service_1.updateBooking)(bookingId, user, action);
        if (!updatedBooking)
            return res.status(404).json({ message: "Booking not found" });
        res.status(200).json({ booking: updatedBooking });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.updateBookingController = updateBookingController;
