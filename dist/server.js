"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const config_1 = __importDefault(require("./config"));
const user_routes_1 = require("./modules/users/user.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const vehicle_routes_1 = require("./modules/vehicles/vehicle.routes");
const booking_routes_1 = require("./modules/bookings/booking.routes");
const app = (0, express_1.default)();
const port = config_1.default.port;
app.use(express_1.default.json());
// Initialize database
(0, db_1.initDB)();
app.use("/api/v1/users", user_routes_1.userRoutes);
app.use("/api/v1/auth", auth_routes_1.authRoutes);
app.use("/api/v1/vehicles", vehicle_routes_1.vehicleRoutes);
app.use("/api/v1/bookings", booking_routes_1.bookingRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
