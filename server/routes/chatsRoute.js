require("express-async-errors")
const { Router } = require("express");
const acessChat = require("../controllers/chats/acessChat");
const createGroupChat = require("../controllers/chats/createGroupChat");
const deleteChat = require("../controllers/chats/deleteChat");
const fetchAllChats = require("../controllers/chats/fecthAllChats");
const pickChat = require("../controllers/chats/pickChat");
const updateGroupChat = require("../controllers/chats/updateGroupChat");
const auth = require("../middlewares/authMiddleware");
const chatsRouter = Router();

chatsRouter.route("/").post(auth, acessChat).get(auth, fetchAllChats)
chatsRouter.post("/createGroupChat", auth, createGroupChat)
chatsRouter.route("/:chatId").get(auth, pickChat).patch(auth, updateGroupChat).delete(auth, deleteChat)

module.exports = chatsRouter;