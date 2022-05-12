const { StatusCodes } = require("http-status-codes");
const Message = require("../../models/MessageModel");

const fetchAllMessages = async (req, res) => {
  const {
    query: { chat, block = 0, limit = 0 },
    user: { id: userId },
  } = req;

  const messages = await Message.find({ chat })
    .sort({ createdAt: 1 })
    .populate("sender", "name email profilePic")
    .populate("chat")
    .limit(Number(limit))
    .skip((Number(block) - 1) * Number(limit));
    
  const messagesCount = await Message.find({ chat }).countDocuments()

  res.status(StatusCodes.OK).json({ total: messagesCount, messages });
};

module.exports = fetchAllMessages;