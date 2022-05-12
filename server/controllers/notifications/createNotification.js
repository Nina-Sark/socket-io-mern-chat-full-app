const { StatusCodes } = require("http-status-codes");
const Notification = require("../../models/Notification");

const createNotification = async (req, res) => {
  const { body } = req;

  const notification = await Notification.create(body);

  res.status(StatusCodes.CREATED).json({ notification });
};

module.exports = createNotification;
