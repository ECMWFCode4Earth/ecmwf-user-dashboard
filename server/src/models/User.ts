import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema, "users"); // Compile user model from user schema

export default User;
