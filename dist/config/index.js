"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
if (!process.env.CONNECTION_STRING) {
    throw new Error("CONNECTION_STRING is not defined in .env");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
}
const config = {
    connection_string: process.env.CONNECTION_STRING,
    port: Number(process.env.PORT) || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
};
exports.default = config;
