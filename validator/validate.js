const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    res.status(400).json(err.array());
    return;
  }

  return next();
};

module.exports = validate;
