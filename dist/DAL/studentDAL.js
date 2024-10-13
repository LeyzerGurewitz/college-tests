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
exports.UpdateClassStudentId = exports.isExistClassName = exports.createStudent = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const createStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = yield studentModel_1.default.create(student);
    if (!newStudent) {
        throw new Error("");
    }
    return newStudent;
});
exports.createStudent = createStudent;
const isExistClassName = (className) => __awaiter(void 0, void 0, void 0, function* () {
    const thereIsAlreadySuchAClass = yield classModel_1.default.findOneAndUpdate({ className });
    if (!thereIsAlreadySuchAClass) {
        throw new Error("No such class exists");
    }
    return thereIsAlreadySuchAClass;
});
exports.isExistClassName = isExistClassName;
const UpdateClassStudentId = (student, classs) => __awaiter(void 0, void 0, void 0, function* () {
    classs.student.push(student._id);
    yield classs.save();
});
exports.UpdateClassStudentId = UpdateClassStudentId;
