import { error } from "console";
import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";


export const createTeacher = async(teacher: ITeacher): Promise<ITeacher> =>{
    const newTeacher = await Teacher.create(teacher);
    if(!newTeacher){
        throw new Error("")
    }
    return newTeacher
}

export const createStudent = async(student: IStudent): Promise<IStudent> =>{
    const newStudent = await Student.create(student);
    if(!newStudent){
        throw new Error("")
    }
    return newStudent 
}