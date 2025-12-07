"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = void 0;
const db_1 = require("../../config/db");
const getAllUsers = async () => {
    const result = await db_1.pool.query("SELECT id, name, email, phone, role, created_at FROM users ORDER BY id ASC");
    return result.rows;
};
exports.getAllUsers = getAllUsers;
const updateUser = async (userId, data, requester) => {
    const targetId = parseInt(userId);
    if (requester.role !== "admin" && requester.id !== targetId)
        return null;
    const fields = [];
    const values = [];
    let index = 1;
    const allowedFields = ["name", "email", "phone"];
    if (requester.role === "admin")
        allowedFields.push("role");
    for (const key of allowedFields) {
        if (data[key] !== undefined) {
            fields.push(`${key} = $${index}`);
            values.push(data[key]);
            index++;
        }
    }
    if (fields.length === 0)
        return null;
    values.push(targetId);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${index} RETURNING id, name, email, phone, role, created_at`;
    const result = await db_1.pool.query(query, values);
    return result.rows[0];
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    try {
        const result = await db_1.pool.query("DELETE FROM users WHERE id = $1", [id]);
        return (result.rowCount ?? 0) > 0;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
};
exports.deleteUser = deleteUser;
