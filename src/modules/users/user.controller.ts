import { Response } from "express";
import { deleteUser, getAllUsers, updateUser } from "./user.service";
import { AuthRequest } from "../../types/express";

 
export const getAllUsersController = async (req: AuthRequest, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

 
export const updateUserController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    const requester = req.user;

    if (!userId) return res.status(400).json({ message: "User ID is required" });
    if (!requester) return res.status(401).json({ message: "Unauthorized" });

    const updatedUser = await updateUser(userId, updatedData, requester);

    if (!updatedUser) return res.status(403).json({ message: "You are not allowed to update this user" });

    res.status(200).json({ user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

 
export const deleteUserController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const success = await deleteUser(userId);

    if (!success) return res.status(400).json({ message: "User could not be deleted" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
