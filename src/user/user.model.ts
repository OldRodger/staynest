import { type Document, model, Schema } from "mongoose";
import validator from "validator";
import type { IUser, UserDocument } from "../utils/types.ts";

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      lowercase: true,
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please provide a valid email"],
      lowercase: true,
      unique: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = model<UserDocument>("user", userSchema);

export default User;
