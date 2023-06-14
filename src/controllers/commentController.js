const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const getComments = async (req, res) => {
  const { postId } = req.body;

  if (!postId) return next(new AppError("Must provide postId in request"), 404);
  const comments = await Comment.find({ postId: postId }).populate({
    path: "userId",
    select: "user_name"
  });

  res.send(comments);
};

const createComment = async (req, res, next) => {
  const { comment, postId } = req.body;

  if (!postId) return next(new AppError("Must provide postId in request"), 404);

  const userExist = await User.findById(userId);
  if (!userExist)
    return next(new AppError("Please provide a valid userId"), 404);

  const postExist = await Post.findById(postId);
  if (!postExist)
    return next(new AppError("Please provide a valid postId"), 404);

  const createdComment = await Comment.create({
    comment: comment,
    userId: req.user._id,
    postId: postId
  });

  res.send(createdComment);
};

const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: id },
    { comment: comment }
  );

  if (!updatedComment)
    return next(new AppError("Error in updating comment", 404));

  res.send(updatedComment);
};

const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  const deletedComment = await Comment.findByIdAndRemove(id);

  if (!deletedComment)
    return next(new AppError("Error in deleting comment", 404));

  res.send(deletedComment);
};

module.exports = { getComments, createComment, updateComment, deleteComment };
