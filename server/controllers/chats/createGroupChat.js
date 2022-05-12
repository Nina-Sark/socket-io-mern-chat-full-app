const { StatusCodes } = require("http-status-codes");
const Chat = require("../../models/ChatModel");
const cloudinary = require("cloudinary");

const createGroupChat = async (req, res) => {
  const {
    body: { name: groupChatName, users, picture },
    user: { id: userId },
  } = req;

  console.log(groupChatName, users, picture)

  if (!groupChatName || !users) {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("Provide the all fields");
  }

  if (users.length < 2) {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("More than 2 users are required to form a group");
  }

  const usersArr = [...users, userId];

  const group_chat_picture = await cloudinary.v2.uploader.upload(picture, {
    folder : "group_chat_pictures",
    width : 150
  })

  const groupChatData = {
    chatName: groupChatName,
    isGroupChat: true,
    users: usersArr,
    groupAdmin: userId,
    groupChatImage : {
      public_id : group_chat_picture?.public_id,
      url : group_chat_picture?.secure_url
    }
  };

  const newGroupChat = await Chat.create(groupChatData);
  const groupChat = await Chat.findById(newGroupChat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(StatusCodes.CREATED).json({ chat: groupChat });
};

module.exports = createGroupChat;