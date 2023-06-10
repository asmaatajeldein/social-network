const Comment = require("../models/Comment");
const AppError = require("../utils/AppError");

const getComments = async (req, res) => {
  const { post } = req.body;

  if (!post) return next(new AppError("Must provide post._id in request"), 404);
  const comments = await Comment.find({ post: post._id }).populate({
    path: "user",
    select: "username"
  });

  res.send(comments);
};

const createComment = async (req, res, next) => {
  const { body, post, user } = req.body;

  if (!post || !user)
    return next(
      new AppError("Must provide user._id and post._id in request"),
      404
    );

  const createdComment = await Comment.create({
    body: body,
    user: user._id,
    post: post._id
  });

  res.send(createdComment);
};

const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;

  const updatedComment = await Comment.updateOne(
    { id: id },
    { $set: { body: body } }
  );

  if (!updatedComment)
    return next(new AppError("Error in deleting comment", 404));

  res.send(updatedComment);
};

const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  const deletedComment = await Comment.deleteOne({ id: id });

  if (!deletedComment)
    return next(new AppError("Error in deleting comment", 404));

  res.send(deletedComment);
};

module.exports = { getComments, createComment, updateComment, deleteComment };
