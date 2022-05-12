require("express-async-errors");
const { Router } = require("express");
const fetchAllMessages = require("../controllers/messages/fetchMessages");
const sendMessage = require("../controllers/messages/sendMessage");
const messagesRouter = Router();

messagesRouter.route("/").post(sendMessage).get(fetchAllMessages);

module.exports = messagesRouter;