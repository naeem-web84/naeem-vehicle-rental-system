import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { addVehicle, deleteVehicle, getAllVehicles, getVehicleById, updateVehicle, Vehicle } from "./vehicle.service";

export const addVehicleController = async (req: AuthRequest, res: Response) => {
  try {
    const vehicleData: Vehicle = req.body;
    if (!vehicleData.vehicle_name || !vehicleData.type || !vehicleData.registration_number || vehicleData.daily_rent_price === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newVehicle = await addVehicle(vehicleData);
    res.status(201).json({ vehicle: newVehicle });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllVehiclesController = async (req: AuthRequest, res: Response) => {
  try {
    const vehicles = await getAllVehicles();
    res.status(200).json({ vehicles });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const getVehicleByIdController = async (req: AuthRequest, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    if (!vehicleId) return res.status(400).json({ message: "Vehicle ID is required" });

    const vehicle = await getVehicleById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    res.status(200).json({ vehicle });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const updateVehicleController = async (req: AuthRequest, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    if (!vehicleId) return res.status(400).json({ message: "Vehicle ID is required" });

    const updatedVehicle = await updateVehicle(vehicleId, req.body);
    if (!updatedVehicle) return res.status(404).json({ message: "Vehicle not found or no fields to update" });

    res.status(200).json({ vehicle: updatedVehicle });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteVehicleController = async (req: AuthRequest, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    if (!vehicleId) return res.status(400).json({ message: "Vehicle ID is required" });

    const success = await deleteVehicle(vehicleId);
    if (!success) return res.status(404).json({ message: "Vehicle not found" });

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
