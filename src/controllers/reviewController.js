const Review = require("../models/Review");
const Post = require("../models/Post");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const getReviews = async (req, res) => {
  const { postId } = req.body;

  if (!postId) return next(new AppError("Must provide postId in request"), 404);
  const reviews = await Review.find({ postId: postId }).populate({
    path: "userId",
    select: "user_name"
  });

  res.send(reviews);
};

const createReview = async (req, res, next) => {
  const { review, postId } = req.body;

  if (!postId) return next(new AppError("Must provide postId in request"), 404);

  const postExist = await Post.findById(postId);
  if (!postExist)
    return next(new AppError("Please provide a valid postId"), 404);

  if (req.review) {
    const updateReview = await Review.findOneAndUpdate(
      { _id: req.review._id },
      { review: review },
      { new: true }
    );

    res.send({ message: "Review Updated!", updateReview });
  } else {
    const createdReview = await Review.create({
      review: review,
      userId: req.user._id,
      postId: postId
    });

    res.send(createdReview);
  }
};

const updateReview = async (req, res, next) => {
  const { id } = req.params;
  const { review } = req.body;

  const updatedReview = await Review.findOneAndUpdate(
    { _id: id },
    { review: review }
  );

  if (!updatedReview)
    return next(new AppError("Error in updating review", 404));

  res.send(updatedReview);
};

const deleteReview = async (req, res, next) => {
  const { id } = req.params;
  const deletedReview = await Review.findByIdAndRemove(id);

  if (!deletedReview)
    return next(new AppError("Error in deleting review", 404));

  res.send(deletedReview);
};

module.exports = { getReviews, createReview, updateReview, deleteReview };
