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
exports.createTeacherService = void 0;
const teacherDAL_1 = require("../DAL/teacherDAL");
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createTeacherService = (teacherName, email, password, className) => __awaiter(void 0, void 0, void 0, function* () {
    const newClass = yield (0, teacherDAL_1.createNewClass)(className);
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const teacher = new teacherModel_1.default({
        teacherName: teacherName,
        email: email,
        password: password,
        status: "teacher",
        class: newClass._id
    });
    const newTeacher = yield (0, teacherDAL_1.createTeacher)(teacher);
    const classUpdate = yield (0, teacherDAL_1.updateClassIdTeacher)(newTeacher, newClass);
    return newTeacher;
});
exports.createTeacherService = createTeacherService;
