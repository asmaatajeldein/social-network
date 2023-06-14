/*
    This middleware ensures that the review being updated,
    is updated by its owner.
*/
const AppError = require("../AppError");
const jwt = require("jsonwebtoken");

const Review = require("../../models/Review");

const canUpdateReview = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  // the id of the logged in user
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  // the id of the user that is being updated
  const toBeUpdatedReview = req.params.id;

  const review = await Review.findById(toBeUpdatedReview);

  if (id == review.userId) {
    next();
  } else {
    return next(new AppError("You are not authorized to edit this review!"));
  }
};

module.exports = canUpdateReview;
