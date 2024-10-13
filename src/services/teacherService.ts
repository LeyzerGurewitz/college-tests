import {} from "../DAL/userDAL";
import {createTeacher ,createNewClass} from "../DAL/teacherDAL"
import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import { create } from "domain";


export const createTeacherService = async(teacherName :string, email:string, password: string, className:string): Promise<ITeacher> => {
    const newClass = await createNewClass(className);
    const teacher= new Teacher({
        teacherName: teacherName,
        email: email,
        password: password
    })
    const newTeacher = await createTeacher(teacher);
    return newTeacher
}