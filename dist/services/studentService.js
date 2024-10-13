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
exports.createStudentService = void 0;
const studentDAL_1 = require("../DAL/studentDAL");
const studentModel_1 = __importDefault(require("../models/studentModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createStudentService = (StudentName, email, password, className) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistClass = yield (0, studentDAL_1.isExistClassName)(className);
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const student = new studentModel_1.default({
        studentName: StudentName,
        email: email,
        password: hashedPassword,
        status: "student",
        class: isExistClass._id
    });
    const newStudent = yield (0, studentDAL_1.createStudent)(student);
    return newStudent;
});
exports.createStudentService = createStudentService;
