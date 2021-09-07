import mongoose, { Schema } from "mongoose";

import { initialTabManagerState } from "../utils/defaults";
import { TabManager } from "../utils/types";
import { generateHash } from "../utils/hashing";


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  apiTokens: {
    token1: { // Token from apps.ecmwf.int
      type: String,
      default: ""
    },
    token2: { // Token from apps-dev.ecmwf.int
      type: String,
      default: ""
    }
  },
  tabManager: {
    type: String,
    default: JSON.stringify(initialTabManagerState),
  }
});


userSchema.methods.saveTabManager = function saveTabManager(tabManager: TabManager) {
  const user: any = this;
  user.tabManager = JSON.stringify(tabManager); // Store in string format.
  user.save();
};


userSchema.methods.loadTabManager = function loadTabManager() {
  const user: any = this;
  const tabManager = JSON.parse(user.tabManager); // Load from string format.
  return tabManager;
};


userSchema.methods.changePassword = function changePassword(newPassword: string) {
  const user: any = this;
  const newPasswordHash = generateHash(newPassword);
  user.passwordHash = newPasswordHash;
  user.save();
};


const User = mongoose.model("User", userSchema, "users"); // Compile user model from user schema

export default User;
