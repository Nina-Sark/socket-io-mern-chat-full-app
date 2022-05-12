const { StatusCodes } = require("http-status-codes");
const Notification = require("../../models/Notification");

const deleteNotification = async (req, res) => {
  const {
    user: { id: userId },
    params: { id },
  } = req;

  const notification = await Notification.findOneAndDelete({
    message_id: id,
    to: userId,
  });

  if(!notification) {
      res.status(StatusCodes.NOT_FOUND)
      throw Error("Notification not found")
  }

  res.status(StatusCodes.OK).json({ success : true });
};

module.exports = deleteNotification;
