const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const verifyAdminRole = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please provide a token!", 400)); //this check is not necessary

  const { role } = jwt.verify(token, process.env.JWT_SECRET);

  if (role !== "admin" && role !== "super-admin")
    return next(
      new AppError(
        "You are not aurthorized for doing this, only admins are!",
        401
      )
    );
  next();
};

module.exports = verifyAdminRole;
