"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStudentRole = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const studentModel_1 = __importDefault(require("../models/studentModel"));
const checkStudentRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // שליפת ה-token מה-cookie
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided." });
            return;
        }
        // אימות ה-token וקבלת פרטי המשתמש
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        // שליפת המשתמש מהמסד הנתונים
        const user = yield studentModel_1.default.findById(decoded.id);
        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        // בדיקת התפקיד של המשתמש
        if (user.status !== "student") {
            res.status(403).json({ error: "Access denied: Only students can perform this action." });
            return;
        }
        // שמירת ה-id של המשתמש באובייקט ה-request
        req.userId = user._id;
        // המשך לפעולה הבאה
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to authenticate or authorize user." });
    }
});
exports.checkStudentRole = checkStudentRole;
