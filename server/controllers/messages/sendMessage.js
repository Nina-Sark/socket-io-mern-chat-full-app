const { StatusCodes } = require("http-status-codes");
const Chat = require("../../models/ChatModel");
const Message = require("../../models/MessageModel");
const User = require("../../models/UserModel");

const sendMessage = async (req, res) => {
  const {
    query: { chat },
    user: { id: userId },
    body: { messageContent },
  } = req;

  const messageData = {
    sender: userId,
    content: messageContent,
    chat,
  };

  let newMessage = await Message.create(messageData);

  newMessage = await newMessage.populate("sender", "name email profilePic");
  newMessage = await newMessage.populate("chat");
  newMessage = await User.populate(newMessage, {
    path: "chat.users",
    select: "name email profilePic",
  });

  await Chat.findByIdAndUpdate(chat, { $set : { latestMessage: newMessage } });

  res.status(StatusCodes.CREATED).json({ message: newMessage });
};

module.exports = sendMessage;
