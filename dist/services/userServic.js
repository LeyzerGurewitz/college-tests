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
exports.authenticateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDAL_1 = require("../DAL/userDAL");
const authenticateUser = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    // מציאת המשתמש על פי שם המשתמש
    const userFind = yield (0, userDAL_1.findTeacherOrStudent)(userName);
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    // בדיקת התאמת הסיסמה
    const passwordMatch = bcrypt_1.default.compareSync(password, userFind.password);
    if (!passwordMatch) {
        throw new Error("Invalid username or password.");
    }
    return userFind; // החזרת המשתמש שנמצא
});
exports.authenticateUser = authenticateUser;
