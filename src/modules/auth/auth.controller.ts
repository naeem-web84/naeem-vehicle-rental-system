import { Request, Response } from "express";
import { signupService, signinService, SignupPayload } from "./auth.service";


export const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;

 
    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const payload: SignupPayload = { name, email, password, phone, role };
    const user = await signupService(payload);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

 
export const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { token, user } = await signinService(email, password);

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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
