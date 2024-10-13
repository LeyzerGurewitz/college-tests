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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudent = void 0;
const studentService_1 = require("../services/studentService");
const registerStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherName, email, password, className } = req.body;
        if (!teacherName || !email || !password || !className) {
            throw new Error("Missing name or email or password");
        }
        const teacher = yield (0, studentService_1.createStudentService)(teacherName, email, password, className);
        res.status(201).json(teacher);
    }
    catch (error) {
        next(error);
    }
});
exports.registerStudent = registerStudent;
