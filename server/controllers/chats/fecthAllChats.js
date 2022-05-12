const { StatusCodes } = require("http-status-codes")
const Chat = require("../../models/ChatModel");
const User = require("../../models/UserModel");

const fetchAllChats = async (req, res) => {
    const { id: userId } = req.user;
    let chats = await Chat.find({ users : { $elemMatch : { $eq : userId } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt : -1 })

    chats = await User.populate(chats, {
        path : "latestMessage.sender",
        select : "name profilePic email"
    })

    res.status(StatusCodes.OK).json({ chats })
}

module.exports = fetchAllChats;