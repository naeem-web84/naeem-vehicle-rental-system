"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userRole = req.user.role;
        const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if (!allowed.includes(userRole)) {
            return res.status(403).json({
                message: "Forbidden: You don't have permission",
            });
        }
        ;
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
