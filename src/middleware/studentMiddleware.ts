import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import student ,{IStudent}from "../models/studentModel";


interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const checkStudentRole = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided." });
      return;
    }

   
    const decoded = verifyToken(token);

   
    const user = await student.findById(decoded.id) 

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    
    if (user.status !== "student") {
      res.status(403).json({ error: "Access denied: Only students can perform this action." });
      return;
    }

    
    (req as any).userId = user._id

   
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate or authorize user." });
  }
};
