import { NextFunction, Request, Response } from "express";
import { createTeacherService, addGradeService, getClassAverageService, getAllUsersGrades} from "../services/teacherService"
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

export const addGrade = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { teacherId } = req.userId; 
        const { email, subject, grade, message } = req.body;

        const updatedStudent = await addGradeService(teacherId, email, subject, grade, message);
        res.status(201).json({ success: true, student: updatedStudent });
    } catch (error) {
        next(error);
    }
};

export const getClassAverage = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { teacherId } = req.user;

        const average = await getClassAverageService(teacherId);
        res.status(200).json({ success: true, average });
    } catch (error) {
        next(error);
    }
};


export const getAllUsersGradesController = async (req: any, res: Response,  next: NextFunction ): Promise<void> => {
    try {
        const teacherId = req.user._id; 
        const grades = await getAllUsersGrades(teacherId);
        res.status(200).json({success: true, "All grades": grades});
    } catch (error) {
        next(error)
    }
};