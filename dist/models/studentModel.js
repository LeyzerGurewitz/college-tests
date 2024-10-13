"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
    studentName: {
        type: String,
        required: [true, "Please upload your name"],
        minlength: [3, "user must least 3 chars "],
        maxLength: [30, "userName ca"],
        match: [/^[a-zA-Z]+$/, "userName can only contain letters, numbers, and underscores"] //בודק שזה אותיות 
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [validator_1.default.isEmail, "Please enter a valid email"], // Using validator for email validation
    },
    password: {
        type: String,
        required: [true, "Please enter an password"],
    },
    status: {
        type: String,
        required: true,
    },
    grades: [
        {
            subject: {
                type: String,
                // required: [true, "Please provide the subject name"]
            },
            grade: {
                type: Number,
                min: 0,
                max: 100
            },
            message: {
                type: String,
                minlength: [3, "user must least 3 chars "],
                maxLength: [100, "A message can be up to one hundred characters"],
            }
        }
    ],
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("student", UserSchema);
