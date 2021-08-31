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
  },
  tabManager: {
    type: String,
    default: JSON.stringify({}),
  }
});


userSchema.methods.saveTabManager = function saveTabManager(tabManager: string) {
  const user: any = this;
  user.tabManager = JSON.stringify(tabManager); // Store in string format.
  user.save();
};


userSchema.methods.loadTabManager = function loadTabManager() {
  const user: any = this;
  const tabManager = JSON.parse(user.tabManager); // Load from string format.
  return tabManager;
};


const User = mongoose.model("User", userSchema, "users"); // Compile user model from user schema

export default User;
