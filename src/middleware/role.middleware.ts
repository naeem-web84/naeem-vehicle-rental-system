import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express";
 

export const roleMiddleware = (allowedRoles: string | string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userRole = req.user.role;

        const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

        if (!allowed.includes(userRole)) {
            return res.status(403).json({
                message: "Forbidden: You don't have permission",
            });
        };
        
        next();
    };
};
