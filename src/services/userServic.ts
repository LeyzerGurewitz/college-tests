import bcrypt from "bcrypt";
import {findTeacherOrStudent} from "../DAL/userDAL"
import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";

export const authenticateUser = async (email: string, password: string): Promise<IStudent | ITeacher> => {
    // מציאת המשתמש על פי שם המשתמש
    const userFind = await findTeacherOrStudent(email);
  
    if (!userFind) {
      throw new Error("Invalid username or password.");
    }
  
    // בדיקת התאמת הסיסמה
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
  
    if (!passwordMatch) {
      throw new Error("Invalid username or password.");
    }
  
    return userFind; // החזרת המשתמש שנמצא
  };


