import {} from "../DAL/userDAL";
import {createStudent, isExistClassName} from "../DAL/studentDAL"

import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import { create } from "domain";


export const createStudentService = async(StudentName :string, email:string, password: string, className:string ): Promise<IStudent> => {
    const isExistClass =  await isExistClassName(className)
    const student= new Student({
        studentName: StudentName,
        email: email,
        password: password,
        class: isExistClass._id;
    })
    const newStudent = await createStudent(student);
    return newStudent
}