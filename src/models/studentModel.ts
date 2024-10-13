import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IGrade {
    subject: string;
    grade: number;
    message: string;
}


export interface IStudent extends Document {
  _id: Types.ObjectId;
  studentName: string;
  email: string;
  password: string;
  status: string,
  grades?: IGrade[];
  class: Types.ObjectId;

}

const UserSchema = new Schema<IStudent>(
    {
      studentName: {
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
      grades:[
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
            message:{
                type: String,
                minlength: [3,  "user must least 3 chars "],
                maxLength: [100, "A message can be up to one hundred characters"],
            }

        }
      ],
      class:{
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
     
    },
    { timestamps: true }
  );
  
  export default mongoose.model<IStudent>("student", UserSchema);
  