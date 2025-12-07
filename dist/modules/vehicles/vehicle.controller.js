"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleController = exports.updateVehicleController = exports.getVehicleByIdController = exports.getAllVehiclesController = exports.addVehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const addVehicleController = async (req, res) => {
    try {
        const vehicleData = req.body;
        if (!vehicleData.vehicle_name || !vehicleData.type || !vehicleData.registration_number || vehicleData.daily_rent_price === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newVehicle = await (0, vehicle_service_1.addVehicle)(vehicleData);
        res.status(201).json({ vehicle: newVehicle });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.addVehicleController = addVehicleController;
const getAllVehiclesController = async (req, res) => {
    try {
        const vehicles = await (0, vehicle_service_1.getAllVehicles)();
        res.status(200).json({ vehicles });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllVehiclesController = getAllVehiclesController;
const getVehicleByIdController = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        if (!vehicleId)
            return res.status(400).json({ message: "Vehicle ID is required" });
        const vehicle = await (0, vehicle_service_1.getVehicleById)(vehicleId);
        if (!vehicle)
            return res.status(404).json({ message: "Vehicle not found" });
        res.status(200).json({ vehicle });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getVehicleByIdController = getVehicleByIdController;
const updateVehicleController = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        if (!vehicleId)
            return res.status(400).json({ message: "Vehicle ID is required" });
        const updatedVehicle = await (0, vehicle_service_1.updateVehicle)(vehicleId, req.body);
        if (!updatedVehicle)
            return res.status(404).json({ message: "Vehicle not found or no fields to update" });
        res.status(200).json({ vehicle: updatedVehicle });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateVehicleController = updateVehicleController;
const deleteVehicleController = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        if (!vehicleId)
            return res.status(400).json({ message: "Vehicle ID is required" });
        const success = await (0, vehicle_service_1.deleteVehicle)(vehicleId);
        if (!success)
            return res.status(404).json({ message: "Vehicle not found" });
        res.status(200).json({ message: "Vehicle deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteVehicleController = deleteVehicleController;
