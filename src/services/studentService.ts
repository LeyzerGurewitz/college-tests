import {} from "../DAL/userDAL";
import {createStudent, isExistClassName, getAllGrades} from "../DAL/studentDAL"

import { NextFunction, Request, Response } from "express";
import Student, { IStudent , IGrade} from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import { create } from "domain";
import bcrypt from "bcrypt";


export const createStudentService = async(StudentName :string, email:string, password: string, className:string ): Promise<IStudent> => {
    const isExistClass =  await isExistClassName(className)
    const hashedPassword = bcrypt.hashSync(password, 10);
    const student= new Student({
        studentName: StudentName,
        email: email,
        password: hashedPassword,
        status: "student",
        grades: [],
        class: isExistClass._id
    })
    const newStudent = await createStudent(student);
    return newStudent
}


export const getAllGradesService = async (studentId: string): Promise<IGrade[]> => {
    const allGrades = await getAllGrades(studentId);
    return allGrades
}