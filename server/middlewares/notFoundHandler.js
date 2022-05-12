const { StatusCodes } = require("http-status-codes")

exports.notFound = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ error : `Route ${req.originalUrl} not found` })