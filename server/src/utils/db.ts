import mongoose from "mongoose";


mongoose.connect(process.env["DB_URI"] as string, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


// Get the default connection
const db = mongoose.connection;


// Do - on successful connection with the database.
db.on("connection", () => {
  console.log("DB connected successfully.");
});


// Throw error on unsuccessful connection with the database.
db.on("error", () => {
  throw new Error("Database connection failed.");
});
