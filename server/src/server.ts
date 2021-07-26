import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import apiRoutes from "./routes/api";

import { notFound } from "./controllers/error";


// Configurations
const corsOptions = {
  origin: "http://127.0.0.1:3000",
};


// Express app
const app = express();


// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false })); // Parse request body content


// API Endpoints
app.use("/api", apiRoutes);


// Handle Error 404 - Not Found
app.use(notFound);


// Serve app
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
