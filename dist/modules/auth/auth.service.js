"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinService = exports.signupService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../config/db");
const config_1 = __importDefault(require("../../config"));
const signupService = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const existing = await db_1.pool.query("SELECT id FROM users WHERE email = $1", [
        email.toLowerCase(),
    ]);
    if (existing.rows.length > 0)
        throw new Error("Email already exists");
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role, created_at`, [name, email.toLowerCase(), hashedPassword, phone, role]);
    return result.rows[0];
};
exports.signupService = signupService;
const signinService = async (email, password) => {
    const userResult = await db_1.pool.query("SELECT * FROM users WHERE email = $1", [
        email.toLowerCase(),
    ]);
    const user = userResult.rows[0];
    if (!user)
        throw new Error("Invalid email or password");
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        throw new Error("Invalid email or password");
    const secret = config_1.default.JWT_SECRET; // ensure it's string
    const token = jwt.sign({ name: user.name, email: user.email, role: user.role, id: user.id }, secret, { expiresIn: "7d" } // ✅ correct spelling
    );
    return { token, user };
};
exports.signinService = signinService;
