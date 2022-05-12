const { StatusCodes } = require("http-status-codes");
const Notification = require("../../models/Notification");

const markAsRead = async (req, res) => {
  const {
    user: { id: userId },
    params: { id },
  } = req;

  const notification = await Notification.findOneAndUpdate(
    {
      message_id : id,
      to: userId,
    },
    {
      read: true,
    },
    {
      new: true,
    }
  );

  if (!notification) {
    res.status(StatusCodes.NOT_FOUND);
    throw Error("Notification not found");
  }

  res.status(StatusCodes.OK).json({ notification });
};

module.exports = markAsRead;
