const AppError = require("./AppError");

const verifyAdminRole = (req, res, next) => {
  const { role } = req.headers.authorization;
  if (role !== "admin")
    return next(
      new AppError(
        "You are not aurthorized for doing this, only admins are!",
        401
      )
    );
  next();
};

module.exports = verifyAdminRole;
