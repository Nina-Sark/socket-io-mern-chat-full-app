const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  read: {
    type: Boolean,
    default: false,
  },
  content: String,
  chat: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "chats",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  avatar: String,
  message_id: String,
  to: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  ],
});

const Notification = mongoose.model("notifications", NotificationSchema);

module.exports = Notification;
