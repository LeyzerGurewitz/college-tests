import {} from "../DAL/userDAL";
import {createTeacher ,createNewClass, updateClassIdTeacher} from "../DAL/teacherDAL"
import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import { create } from "domain";
import bcrypt from "bcrypt";


export const createTeacherService = async(teacherName :string, email:string, password: string, className:string): Promise<ITeacher> => {
    const newClass = await createNewClass(className);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const teacher= new Teacher({
        teacherName: teacherName,
        email: email,
        password: password,
        status: "teacher",
        class: newClass._id
    })
    const newTeacher = await createTeacher(teacher);
    const classUpdate = await updateClassIdTeacher(newTeacher, newClass)
    return newTeacher

}
