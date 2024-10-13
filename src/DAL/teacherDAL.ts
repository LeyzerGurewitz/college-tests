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
    const newClass = await Class.create({className})
    return newClass
}
export const updateClassIdTeacher = async(teacher:ITeacher, classs:IClass): Promise<IClass> => {
    const classUpdate = await Class.findByIdAndUpdate(classs._id,  { teacher: teacher._id },
        {new: true}
    )
    if(!classUpdate){
        throw new Error("No class found")
    }
    return classUpdate
}