const { StatusCodes } = require("http-status-codes");
const Chat = require("../../models/ChatModel");
const cloudinary = require("cloudinary");

const updateGroupChat = async (req, res) => {
  const {
    params: { chatId },
    body: { chatName, users, picture },
  } = req;

  const newGroupChatImage = await cloudinary.v2.uploader.upload(picture, {
    folder: "group_chat_images",
    width: 150,
  });

  const updatedChatData = {
    chatName,
    users,
    groupChatImage: {
      public_id: newGroupChatImage?.public_id,
      url: newGroupChatImage?.secure_url,
    },
  };

  const chat = await Chat.findByIdAndUpdate(chatId, updatedChatData, {
    new: true,
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(StatusCodes.OK).json({ chat });
};

module.exports = updateGroupChat;
