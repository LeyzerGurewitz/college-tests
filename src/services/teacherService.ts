import {} from "../DAL/userDAL";
import {createTeacher ,createNewClass, updateClassIdTeacher, addGradeToStudent, getClassAverage, findStudentsByClassId} from "../DAL/teacherDAL"
import { NextFunction, Request, Response } from "express";
import Student, { IStudent , IGrade} from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import { create } from "domain";
import bcrypt from "bcrypt";


export const createTeacherService = async(teacherName :string, email:string, password: string, className:string): Promise<ITeacher> => {
    const newClass = await createNewClass(className);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const teacher= new Teacher({
        teacherName: teacherName,
        email: email,
        password: hashedPassword,
        status: "teacher",
        class: newClass._id
    })
    const newTeacher = await createTeacher(teacher);
    const classUpdate = await updateClassIdTeacher(newTeacher, newClass)
    return newTeacher

}

export const addGradeService = async (teacherId: string, email: string, subject: string, grade: number, message: string) => {
    const newGrade: IGrade = { subject, grade, message };

    const updatedStudent = await addGradeToStudent(teacherId, email, newGrade);
    return updatedStudent;
};

export const getClassAverageService = async (teacherId: string): Promise<number> => {
    
    return await getClassAverage(teacherId);
}



export const getAllUsersGrades = async (teacherId: string) => {
    
    const teacher = await Teacher.findById(teacherId).populate("class");

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    
    const students = await findStudentsByClassId(teacher.class._id.toString());

    if (!students.length) {
        throw new Error("No users found");
    }

    return students; 
}