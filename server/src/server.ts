import express from "express";
import cors from "cors";
import passport from "passport";

require("dotenv").config();

import "./utils/db";
import "./utils/auth";

import authRoutes from "./routes/auth";
import apiRoutes from "./routes/api";

import { notFoundController, defaultErrorController } from "./controllers/errors";


// Express app
const app = express();


// Configurations
const corsOptions = {
  origin: "*", // TODO Dev
};


// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(passport.initialize());


// Auth Endpoints
app.use("/", authRoutes);


// API Endpoints
app.use("/api", passport.authenticate("jwt", { session: false }), apiRoutes);


// Errors
app.use(notFoundController); // Handle Error 404 - Not Found
app.use(defaultErrorController); // Default internal server error handler


// Serve app
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
