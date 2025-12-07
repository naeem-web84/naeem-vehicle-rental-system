import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email?: string;
    role: "admin" | "customer";
    name?: string;
  };
}
