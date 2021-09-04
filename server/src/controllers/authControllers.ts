import { RequestHandler } from "express";

import User from "../models/User";

import { issueJWT } from "../utils/jwt";
import { generateHash, isPasswordValid } from "../utils/hashing";


export const signupController: RequestHandler = async (req, res, next) => {
  try {

    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    if (!name || !username || !password) {
      return res.status(400).json({ success: false, message: "Incomplete parameters" });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const passwordHash = generateHash(password);

    const user = new User({
      name: name,
      username: username,
      passwordHash: passwordHash,
    });

    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully. Please log in." });

  } catch (err) {
    if (err.name === "MongoError") {
      return res.status(500).json({ success: false, message: "Database error" });
    }
    next(err);
  }
};


export const loginController: RequestHandler = async (req, res, next) => {
  try {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Incomplete parameters" });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ success: false, message: "User does not exist" });
    }

    const isValid = isPasswordValid(password, user.passwordHash); // Check validity of password

    if (isValid) {
      const token = issueJWT(user);
      const data = {
        name: user.name,
        username: user.username,
        ...token
      };
      res.status(200).json({ success: true, message: "Logged in", data });
    } else {
      res.status(401).json({ success: false, message: "Wrong credentials" });
    }

  } catch (err) {
    next(err);
  }
};


// This will pass through authentication wall. (Need JWT) - handled by PassportJS
export const changePasswordController: RequestHandler = async (req, res, next) => {
  try {

    const newPassword = req.body.newPassword;

    if (!newPassword) {
      return res.status(400).json({ success: false, message: "Incomplete parameters." });
    }

    const user: any = req.user;
    user.changePassword(newPassword);

    res.status(200).json({ success: true, message: "Password changed successfully." });

  } catch (err) {
    next(err);
  }
};






