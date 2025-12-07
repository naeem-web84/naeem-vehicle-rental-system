"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinController = exports.signupController = void 0;
const auth_service_1 = require("./auth.service");
const signupController = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password || !phone || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const payload = { name, email, password, phone, role };
        const user = await (0, auth_service_1.signupService)(payload);
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.signupController = signupController;
const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const { token, user } = await (0, auth_service_1.signinService)(email, password);
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.signinController = signinController;
