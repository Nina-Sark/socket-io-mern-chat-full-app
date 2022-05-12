const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
      maxlength: 200,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupChatImage: {
      public_id: String,
      url: String,
    },
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
      },
    ],
    latestMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "messages",
    },
    groupAdmin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chats", ChatSchema);

module.exports = Chat;
