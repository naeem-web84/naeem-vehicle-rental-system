"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getAllUsersController = void 0;
const user_service_1 = require("./user.service");
const getAllUsersController = async (req, res) => {
    try {
        const users = await (0, user_service_1.getAllUsers)();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllUsersController = getAllUsersController;
const updateUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const requester = req.user;
        if (!userId)
            return res.status(400).json({ message: "User ID is required" });
        if (!requester)
            return res.status(401).json({ message: "Unauthorized" });
        const updatedUser = await (0, user_service_1.updateUser)(userId, updatedData, requester);
        if (!updatedUser)
            return res.status(403).json({ message: "You are not allowed to update this user" });
        res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId)
            return res.status(400).json({ message: "User ID is required" });
        const success = await (0, user_service_1.deleteUser)(userId);
        if (!success)
            return res.status(400).json({ message: "User could not be deleted" });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUserController = deleteUserController;
