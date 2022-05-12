const { StatusCodes } = require("http-status-codes");

const logout = async (req, res) => {
    req.user = null;
    res.status(StatusCodes.OK).json({ success : true })
}

module.exports = logout;