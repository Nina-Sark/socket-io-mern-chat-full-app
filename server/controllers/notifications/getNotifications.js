const { StatusCodes } = require("http-status-codes");
const Notification = require("../../models/Notification");

const getNotifications = async (req, res) => {
  const { id } = req.user;

  const notifications = await Notification.find({
    to: id,
  });

  res.status(StatusCodes.OK).json({ notifications });
};

module.exports = getNotifications;
