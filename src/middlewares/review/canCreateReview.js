/*
    This middleware ensures that the review being created,
    does not exist before.
*/
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken");

const Review = require("../../models/Review");

const canCreateReview = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  // the id of the logged in user
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const review = await Review.findOne({ userId: id });

  if (review) {
    req.review = review;
  }

  next();
};

module.exports = canCreateReview;
