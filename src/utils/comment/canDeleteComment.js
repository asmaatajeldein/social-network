/*
    This middleware ensures that the comment being deleted,
    is deleted by its owner, or an admin.
*/
const AppError = require("../AppError");
const jwt = require("jsonwebtoken");

const Comment = require("../../models/Comment");

const canDeleteComment = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  // the id of the logged in user
  const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

  if (role == "user") {
    const comment = await Comment.findOne({ userId: id });
    if (id == comment.userId) {
      next();
    } else {
      return next(
        new AppError("You are not authorized to delete this comment!")
      );
    }
  } else if (role == "super-admin") {
    next();
  } else {
    return next(new AppError("You are not authorized to delete this comment!"));
  }
};

module.exports = canDeleteComment;
