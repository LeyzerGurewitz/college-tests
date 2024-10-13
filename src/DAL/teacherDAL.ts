import { error } from "console";
import Teacher, { ITeacher } from "../models/teacherModel";
import Class, {IClass} from "../models/classModel" 


export const createTeacher = async(teacher: ITeacher): Promise<ITeacher> =>{
    const newTeacher = await Teacher.create(teacher);
    if(!newTeacher){
        throw new Error("")
    }
    return newTeacher
}
export const createNewClass = async(className:string): Promise<IClass> => {
    const thereIsAlreadySuchAClass = await Class.findOne({className});
    if(thereIsAlreadySuchAClass){
        throw new Error("There is already such a class")
    }
    const newClass = await Class.create(className)
    return newClass
}