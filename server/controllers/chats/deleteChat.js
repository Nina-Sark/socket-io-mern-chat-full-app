const { StatusCodes } = require("http-status-codes");
const Chat = require("../../models/ChatModel");
const Message = require("../../models/MessageModel");

const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  const deletedChat = await Chat.findOneAndDelete({ _id: chatId });

  const deletedMessages = await Message.deleteMany({ chat: chatId });

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = deleteChat;