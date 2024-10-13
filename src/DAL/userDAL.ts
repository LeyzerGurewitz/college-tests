import { error } from "console";
import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import teacherModel from "../models/teacherModel";


export const findTeacherOrStudent = async(email: string): Promise<ITeacher | IStudent> =>{
    const newTeacher = await Teacher.findOne({ email: email });
    if(newTeacher){
        return newTeacher
    }
    const findStudent = await Student.findOne({ email: email });
    if(!findStudent){
        throw new Error("No user found")
    }
    return findStudent
}

export const createStudent = async(student: IStudent): Promise<IStudent> =>{
    const newStudent = await Student.create(student);
    if(!newStudent){
        throw new Error("")
    }
    return newStudent 
}