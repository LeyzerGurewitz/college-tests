import { NextFunction, Request, Response } from "express";
import { createStudentService,  getAllGradesService } from "../services/studentService"
import {ITeacher} from "../models/teacherModel"


export const registerStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>{
    try {
        const {teacherName, email, password, className} = req.body;
        if(!teacherName || !email || !password|| !className ){
            throw new Error ("Missing name or email or password")
        }

        const teacher = await createStudentService(teacherName, email, password, className);
        res.status(201).json(teacher);
        } 
        
     catch (error) {
        next(error)
     }
}

export const getStudentGrades = async (req: any, res: Response,  next: NextFunction): Promise<void> => {
    try {
      
      const userId = req.userId;
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
  
      
      const grades = await  getAllGradesService(userId);
  
      res.status(200).json({ grades });
    }catch (error) {
        next(error)
     }
  };