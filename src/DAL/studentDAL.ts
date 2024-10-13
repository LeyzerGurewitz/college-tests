import { error } from "console";
import Student, { IStudent } from "../models/studentModel";
import Class, {IClass} from "../models/classModel" 

export const createStudent = async(student: IStudent): Promise<IStudent> =>{
    const newStudent = await Student.create(student);
    if(!newStudent){
        throw new Error("")
    }
    return newStudent 
}

export const isExistClassName = async(className:string): Promise<IClass> => {
    const thereIsAlreadySuchAClass = await Class.findOneAndUpdate({className});
    if(!thereIsAlreadySuchAClass){
        throw new Error("No such class exists")
    }
    return thereIsAlreadySuchAClass
}

export const UpdateClassStudentId = async (student:IStudent, classs:IClass): Promise<void> => {
    classs.student.push(student._id);
    await classs.save();
}