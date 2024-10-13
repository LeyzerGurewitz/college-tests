import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import teacher ,{ITeacher}from "../models/teacherModel";

// הוספת ממשק מותאם ל-request כדי שנוכל להוסיף בו את ה-id
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const checkTeacherRole = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // שליפת ה-token מה-cookie
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided." });
      return;
    }

    // אימות ה-token וקבלת פרטי המשתמש
    const decoded = verifyToken(token);

    // שליפת המשתמש מהמסד הנתונים
    const user = await teacher.findById(decoded.id) 

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // בדיקת התפקיד של המשתמש
    if (user.status !== "teacher") {
      res.status(403).json({ error: "Access denied: Only students can perform this action." });
      return;
    }

    // שמירת ה-id של המשתמש באובייקט ה-request
    (req as any).userId = user._id

    // המשך לפעולה הבאה
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate or authorize user." });
  }
};
