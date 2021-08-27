import { RequestHandler } from "express";

import User from "../models/User";

import { generateHash, isPasswordValid } from "../utils/hashing";
import { issueJWT } from "../utils/jwt";


export const signupController: RequestHandler = async (req, res, next) => {
  try {

    const username = req.body.username;
    const password = req.body.password;

    const hash = generateHash(password);

    const user = new User({
      username: username,
      passwordHash: hash,
    });

    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully. Please log in." }); // TODO Modify this

  } catch (err) {
    if (err.name === "MongoError") {
      return res.status(500).json({ success: false, message: "Database error" });
    }
    next(err)
  }
};


export const loginController: RequestHandler = async (req, res, next) => {
  try {

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ success: false, message: "User does not exist" });
    }

    const isValid = isPasswordValid(req.body.password, user.passwordHash); // Check validity of password

    if (isValid) {
      const token = issueJWT(user);
      res.status(200).json({ success: true, message: "Logged in", data: { token: token } });
    } else {
      res.status(401).json({ success: false, message: "Wrong credentials" });
    }

  } catch (err) {
    next(err);
  }
};
