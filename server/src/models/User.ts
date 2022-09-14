import mongoose, { Schema } from "mongoose";

import { initialTabManagerState } from "../utils/defaults";
import {Endpoint, TabManager} from "../utils/types";
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
  APIEndpoints: {
    type: [{
      url: String,
      token: String
    }],
    default: [{url:`https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/user-dashboard/GetWidgets/`, token:''}]
  },
  tabManager: {
    type: String,
    default: JSON.stringify(initialTabManagerState),
  }
});

// TODO: try delete functionality as well

userSchema.methods.addAPIEndpoints = function addEndpoints(endpoint: Endpoint){
  const user: any = this;
  console.log("existing endpoints: ", user.APIEndpoints)
  console.log("new endpoints: ", endpoint)
  user.APIEndpoints = user.APIEndpoints.concat(endpoint)
  user.save()
  console.log(user.APIEndpoints)
}

userSchema.methods.deleteAPIEndpoints = function(){
  const user: any = this
  user.APIEndpoints = [{url:`https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/user-dashboard/GetWidgets/`, token:''}]
  user.save()
}

userSchema.methods.deleteAPIEndpoint = function deleteEndpoint(endpoint: Endpoint){
  const user: any = this;
  console.log("request received")
  console.log(endpoint)
  user.APIEndpoints = user.APIEndpoints.filter((ep:Endpoint) => {
    console.log(ep)
    return ep.url != endpoint.url
  })
  user.save()
}

userSchema.methods.loadAPIEndpoints = function loadEndpoints(){
  const user: any = this;
  return user.APIEndpoints
}

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
