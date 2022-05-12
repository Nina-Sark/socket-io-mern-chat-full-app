const { StatusCodes } = require("http-status-codes");
const Chat = require("../../models/ChatModel");
const User = require("../../models/UserModel");

const pickChat = async (req, res) => {
  const {
    params: { chatId },
    user: { id },
  } = req;

  let chat = await Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { $eq: id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");

  chats = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name email profilePic",
  });

  if (!chat) {
    res.status(StatusCodes.NOT_FOUND);
    throw Error("Chat not found");
  }

  res.status(StatusCodes.OK).json({ chat });
};

module.exports = pickChat;