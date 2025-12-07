import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { createBooking, getBookings, updateBooking } from "./booking.service";


export const createBookingController = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const booking = await createBooking({ ...req.body, customer_id: user.id });
    res.status(201).json({ booking });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


export const getBookingsController = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const bookings = await getBookings(user);
    res.status(200).json({ bookings });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const updateBookingController = async (req: AuthRequest, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    if (!bookingId) return res.status(400).json({ message: "Booking ID required" });

    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const action = req.body.action as "cancel" | "return";
    if (!action) return res.status(400).json({ message: "Action required (cancel/return)" });

    const updatedBooking = await updateBooking(bookingId, user, action);
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ booking: updatedBooking });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
