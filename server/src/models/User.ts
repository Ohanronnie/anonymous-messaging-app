import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, IMethod } from "../interfaces/user.js";
import { config } from "dotenv";
config();
mongoose
  .connect(process.env.MONGOURL!)
  .then(function () {
    console.log("Connected successfully");
  })
  .catch(function (err) {
    console.log(err);
  });
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  messages: [],
});
UserSchema.pre<IMethod>("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
