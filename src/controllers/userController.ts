import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import { ResponseStructure} from "../types/response";
import {createToken} from "../utils/jwtUtils";
import {authenticateUser}from "../services/userServic"; 



export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const {email, password } = req.body;
  
      if (!email || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const user = await authenticateUser(email, password);
      if (user) {
      
        const token = createToken(
          { _id: user._id, status: user.status }, 
          '1h' 
        );
  
       
        res.cookie("token", token, {
          httpOnly: true,
          secure: true, 
          sameSite: "strict",
          maxAge: 3600000 
        });
  
        res.status(200).json({ message: "Login successful", user: { id: user._id,  role: user.status } });
      } 
      else {
        res.status(401).json({ message: "Authentication failed" });
      }
    }
    catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    }
  
  