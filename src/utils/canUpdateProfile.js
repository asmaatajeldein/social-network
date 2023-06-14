/*
    This middleware ensures that the profile being updated,
    is updated by its owner, unless the user trying to update the profile,
    is a super admin, and he is just updating the role; nothing more!
*/
const AppError = require("./AppError");
const jwt = require("jsonwebtoken");

const canUpdateProfile = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  // the id and role of the logged in user
  const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

  // the id of the user that is being updated
  const toBeUpdatedUserId = req.params.id;

  // checking if the user is updating his profile (not other user profile)
  // if his profile => next!
  // else check if he has a super-admin role
  if (id === toBeUpdatedUserId) {
    next();
  } else {
    if (role === "super-admin") {
      next();
    } else {
      return next(new AppError("You are not authorized!", 400));
    }
  }
};

module.exports = canUpdateProfile;
