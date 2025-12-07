import { pool } from "../../config/db";
import { Vehicle } from "../vehicles/vehicle.service";

export interface Booking {
  id?: number;
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string; 
  rent_end_date: string; 
  total_price: number;
  status?: "active" | "cancelled" | "returned";
  created_at?: Date;
}


export const createBooking = async (data: Booking): Promise<Booking | null> => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data;


  const vehicleRes = await pool.query<Vehicle>(
    "SELECT * FROM vehicles WHERE id = $1",
    [vehicle_id]
  );
  const vehicle = vehicleRes.rows[0];
  if (!vehicle) throw new Error("Vehicle not found");
  if (vehicle.availability_status !== "available") throw new Error("Vehicle is not available");

 
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (duration <= 0) throw new Error("Invalid booking period");

  const total_price = Number(vehicle.daily_rent_price) * duration;

 
  const result = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, 'active')
     RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, created_at`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  
  await pool.query("UPDATE vehicles SET availability_status = 'booked' WHERE id = $1", [vehicle_id]);

  return result.rows[0];
};

 
export const getBookings = async (user: { id: number; role: string }) => {
  if (user.role === "admin") {
    const res = await pool.query("SELECT * FROM bookings ORDER BY id ASC");
    return res.rows;
  } else {
    const res = await pool.query("SELECT * FROM bookings WHERE customer_id = $1 ORDER BY id ASC", [user.id]);
    return res.rows;
  }
};

 
export const updateBooking = async (bookingId: string, user: { id: number; role: string }, action: "cancel" | "return") => {
  const bookingRes = await pool.query("SELECT * FROM bookings WHERE id = $1", [bookingId]);
  const booking = bookingRes.rows[0];
  if (!booking) return null;

 
  if (action === "cancel") {
    if (user.role !== "customer" || user.id !== booking.customer_id) {
      throw new Error("Unauthorized to cancel booking");
    }
    const today = new Date();
    if (new Date(booking.rent_start_date) <= today) {
      throw new Error("Cannot cancel after start date");
    }
    await pool.query("UPDATE bookings SET status='cancelled' WHERE id=$1", [bookingId]);
    await pool.query("UPDATE vehicles SET availability_status='available' WHERE id=$1", [booking.vehicle_id]);
  }

 
  if (action === "return") {
    if (user.role !== "admin") throw new Error("Only admin can mark returned");
    await pool.query("UPDATE bookings SET status='returned' WHERE id=$1", [bookingId]);
    await pool.query("UPDATE vehicles SET availability_status='available' WHERE id=$1", [booking.vehicle_id]);
  }

  const updated = await pool.query("SELECT * FROM bookings WHERE id=$1", [bookingId]);
  return updated.rows[0];
};

 
export const autoReturnBookings = async () => {
  const today = new Date().toISOString().split("T")[0];
  const res = await pool.query("SELECT * FROM bookings WHERE status='active' AND rent_end_date < $1", [today]);
  for (const booking of res.rows) {
    await pool.query("UPDATE bookings SET status='returned' WHERE id=$1", [booking.id]);
    await pool.query("UPDATE vehicles SET availability_status='available' WHERE id=$1", [booking.vehicle_id]);
  }
};
