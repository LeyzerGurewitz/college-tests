import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ITeacher extends Document {
  _id: Types.ObjectId;
  teacherName: string;
  email: string;
  password: string;
  status: string;
  class: Types.ObjectId;
}

const TeacherSchema = new Schema<ITeacher>(
    {
      teacherName: {
        type: String,
        required: [true, "Please upload your name"],
        minlength: [3,  "user must least 3 chars "],
        maxLength: [30, "userName ca"],
        match: [/^[a-zA-Z]+$/,"userName can only contain letters, numbers, and underscores"] //בודק שזה אותיות 
      },
      email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"], // Using validator for email validation
      },
      password:{
        type: String,
        required: [true, "Please enter an password"],
      },
      status:{
        type: String,
        required: true,
      },
      class:{
        type: Schema.Types.ObjectId,
        ref: "Class",
      }
     
    },
    { timestamps: true }
  );
  
  export default mongoose.model<ITeacher>("teacher", TeacherSchema);
  