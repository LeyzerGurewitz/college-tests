"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// מפתח סודי ל-JWT (עדיף לשמור במשתנה סביבה)
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
// פונקציה ליצירת JWT
const createToken = (payload, expiresIn = "1h") => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
};
exports.createToken = createToken;
// פונקציה לאימות JWT
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
