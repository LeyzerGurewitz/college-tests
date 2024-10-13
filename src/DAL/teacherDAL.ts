import { error } from "console";
import Teacher, { ITeacher } from "../models/teacherModel";
import Class, {IClass} from "../models/classModel" 

import Student, {IStudent, IGrade} from "../models/studentModel" 

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



export const addGradeToStudent = async (teacherId: string, email: string, newGrade: IGrade): Promise<IStudent> => {
    
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
        throw new Error("not find teacher")
    }

    const student = await Student.findOne({email}).populate({
        path: 'class',
        select: "name"
    });
    if (!student) {
        throw new Error("not find student")
    }

    if (student.class.toString() !== teacher.class.toString()) {
        throw new Error("You cannot add a grade to a student not in your class");
    }

    student.grades.push(newGrade)
    await student.save();

    return student;
};



export const getClassAverage = async (teacherId: string): Promise<number> => {
    
    const teacher = await Teacher.findById(teacherId).populate({
        path: 'class',
        select: "_id" 
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

   
    const classId = teacher.class._id; 
    const average = await Student.aggregate([
        { $match: { class: classId } }, 
        { $unwind: "$grades" }, 
        {
            $group: {
                _id: null, 
                totalGrades: { $sum: "$grades.grade" }, 
                totalSubjects: { $sum: 1 } 
            }
        }
    ]);

    if (!average.length || average[0].totalSubjects === 0) return 0;

   
    return average[0].totalGrades / average[0].totalSubjects;
};


export const findStudentsByClassId = async (classId: string) => {
    return await Student.find({ class: classId }, { grades: 1, _id: 0 });
};


   