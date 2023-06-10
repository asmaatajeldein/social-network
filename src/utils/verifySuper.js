/*
    This middleware is implemented to check that the user updating the role of 
    any other user is a super-admin.
    The only one who can update the user role is the super admin.
*/

const AppError = require("./AppError");
const jwt = require("jsonwebtoken");

const canUpdateRole = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please provide a token!", 400)); // this check is not necessary

  const { role } = jwt.verify(token, "mysecret");

  if (req.body.role) {
    if (role !== "super-admin")
      return next(
        new AppError("You are not authorized, only super admins are!", 400)
      );
  }

  next();
};

module.exports = canUpdateRole;
