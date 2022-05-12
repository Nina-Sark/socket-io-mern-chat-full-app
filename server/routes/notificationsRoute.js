const { Router } = require("express");
const createNotification = require("../controllers/notifications/createNotification");
const deleteNotification = require("../controllers/notifications/deleteNotification");
const getNotifications = require("../controllers/notifications/getNotifications");
const markAsRead = require("../controllers/notifications/markAsRead");
const notificationsRouter = Router()

notificationsRouter.route("/").get(getNotifications).post(createNotification)
notificationsRouter.route("/:id").patch(markAsRead).delete(deleteNotification)

module.exports = notificationsRouter;