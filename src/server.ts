import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import config from "./config";  
import { userRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";

const app = express();
const port = config.port;

app.use(express.json());

// Initialize database
initDB(); 

app.use("/api/v1/users",  userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
