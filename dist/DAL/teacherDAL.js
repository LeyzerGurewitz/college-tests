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
exports.updateClassIdTeacher = exports.createNewClass = exports.createTeacher = void 0;
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const createTeacher = (teacher) => __awaiter(void 0, void 0, void 0, function* () {
    const newTeacher = yield teacherModel_1.default.create(teacher);
    if (!newTeacher) {
        throw new Error("");
    }
    return newTeacher;
});
exports.createTeacher = createTeacher;
const createNewClass = (className) => __awaiter(void 0, void 0, void 0, function* () {
    const thereIsAlreadySuchAClass = yield classModel_1.default.findOne({ className });
    if (thereIsAlreadySuchAClass) {
        throw new Error("There is already such a class");
    }
    const newClass = yield classModel_1.default.create({ className });
    return newClass;
});
exports.createNewClass = createNewClass;
const updateClassIdTeacher = (teacher, classs) => __awaiter(void 0, void 0, void 0, function* () {
    const classUpdate = yield classModel_1.default.findByIdAndUpdate(classs._id, { teacher: teacher._id }, { new: true });
    if (!classUpdate) {
        throw new Error("No class found");
    }
    return classUpdate;
});
exports.updateClassIdTeacher = updateClassIdTeacher;
