const { StatusCodes, ACCEPTED } = require("http-status-codes");
const Chat = require("../../models/ChatModel");
const User = require("../../models/UserModel");

const acessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("Please provide <userId>");
  }

  let chat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user.id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name profilePic email",
  });

  if (chat) {
    res.status(StatusCodes.OK).json({ chat });
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userId, req.user.id]
    };

    const newChat = await Chat.create(chatData);

    const createdChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );

    res.status(StatusCodes.CREATED).json({ chat: createdChat });
  }
};

module.exports = acessChat;