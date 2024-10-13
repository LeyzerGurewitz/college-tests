import { NextFunction, Request, Response } from "express";
import { createTeacherService } from "../services/teacherService"
import {ITeacher} from "../models/teacherModel"


export const registerTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>{
    try {
        const {teacherName, email, password, className} = req.body;
        if(!teacherName || !email || !password|| !className ){
            throw new Error ("Missing name or email or password")
        }

        const teacher = await createTeacherService(teacherName, email, password, className);
        res.status(201).json(teacher);
        } 
        
     catch (error) {
        next(error)
     }
}
