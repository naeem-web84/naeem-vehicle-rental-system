import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { AuthRequest } from "../types/express";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authReq = req as AuthRequest;

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
      name: string;
    };

    authReq.user = {
      id: Number (decoded.id),
      email: decoded.email,
      role: decoded.role as "admin" | "customer",
      name: decoded.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};
