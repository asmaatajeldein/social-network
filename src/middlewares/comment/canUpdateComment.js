/*
    This middleware ensures that the comment being updated,
    is updated by its owner.
*/
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken");

const Comment = require("../../models/Comment");

const canUpdateComment = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  // the id of the logged in user
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  // the id of the user that is being updated
  const toBeUpdatedComment = req.params.id;

  const comment = await Comment.findById(toBeUpdatedComment);

  if (id == comment.userId) {
    next();
  } else {
    return next(new AppError("You are not authorized to edit this comment!"));
  }
};

module.exports = canUpdateComment;
