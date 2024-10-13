import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
  _id: Types.ObjectId;
  className: string;
  teacher: Types.ObjectId;
  student: Types.ObjectId[];
}

const UserSchema = new Schema<IClass>(
    {
      className: {
        type: String,
        required: [true, "Please upload your name"],
        minlength: [3,  "user must least 3 chars "],
        maxLength: [30, "userName ca"],
      },
      teacher:{
        type: Schema.Types.ObjectId,
        ref: "teacher",
      },
      student:[
        {
            type: Schema.Types.ObjectId,
            ref: "student",
        }
      ]
     
    },
    { timestamps: true }
  );
  
  export default mongoose.model<IClass>("Class", UserSchema);
  