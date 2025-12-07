"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getAllVehicles = exports.addVehicle = void 0;
const db_1 = require("../../config/db");
const addVehicle = async (data) => {
    const result = await db_1.pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at`, [data.vehicle_name, data.type, data.registration_number, data.daily_rent_price, data.availability_status]);
    return result.rows[0];
};
exports.addVehicle = addVehicle;
const getAllVehicles = async () => {
    const result = await db_1.pool.query("SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at FROM vehicles ORDER BY id ASC");
    return result.rows;
};
exports.getAllVehicles = getAllVehicles;
const getVehicleById = async (id) => {
    const result = await db_1.pool.query("SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at FROM vehicles WHERE id = $1", [id]);
    return result.rows[0] || null;
};
exports.getVehicleById = getVehicleById;
const updateVehicle = async (id, data) => {
    const fields = [];
    const values = [];
    let index = 1;
    const allowedFields = ["vehicle_name", "type", "registration_number", "daily_rent_price", "availability_status"];
    for (const key of allowedFields) {
        if (data[key] !== undefined) {
            fields.push(`${key} = $${index}`);
            values.push(data[key]);
            index++;
        }
    }
    if (fields.length === 0)
        return null;
    values.push(id);
    const query = `UPDATE vehicles SET ${fields.join(", ")} WHERE id = $${index} RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at`;
    const result = await db_1.pool.query(query, values);
    return result.rows[0] || null;
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (id) => {
    try {
        const result = await db_1.pool.query("DELETE FROM vehicles WHERE id = $1", [id]);
        return (result.rowCount ?? 0) > 0;
    }
    catch (err) {
        console.error("Error deleting vehicle:", err);
        return false;
    }
};
exports.deleteVehicle = deleteVehicle;
