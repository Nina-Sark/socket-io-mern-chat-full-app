const errorHandler = (err, req, res, next) => {
  if (err.message) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 403;
    res.status(statusCode);
    res.json({ error: err.message });
  }

  next(err);
};

exports.errorHandler = errorHandler;
