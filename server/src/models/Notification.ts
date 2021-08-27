import mongoose, { Schema } from "mongoose";


const notificationSchema = new Schema({
  message: {
    type: String,
    required: true,
  }
});

const Notification = mongoose.model("Notification", notificationSchema, "notifications");

export default Notification;
