import * as jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';
import { pool } from "../../config/db";
import config from '../../config';

 
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export const signupService = async (payload: SignupPayload) => {
  const { name, email, password, phone, role } = payload;

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
    email.toLowerCase(),
  ]);
  if (existing.rows.length > 0) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role, created_at`,
    [name, email.toLowerCase(), hashedPassword, phone, role]
  );

  return result.rows[0];
};

export const signinService = async (email: string, password: string) => {
  const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [
    email.toLowerCase(),
  ]);
  const user = userResult.rows[0];
  if (!user) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  const secret = config.JWT_SECRET as string; // ensure it's string

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role, id: user.id },
    secret,
    { expiresIn: "7d" } // ✅ correct spelling
  );

  return { token, user };
};
