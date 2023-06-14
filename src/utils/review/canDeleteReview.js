/*
    This middleware ensures that the review being deleted,
    is deleted by its owner, or an admin.
*/
const AppError = require("../AppError");
const jwt = require("jsonwebtoken");

const Review = require("../../models/Review");

const canDeleteReview = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  // the id of the logged in user
  const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

  if (role == "user") {
    const review = await Review.findOne({ userId: id });
    if (id == review.userId) {
      next();
    } else {
      return next(
        new AppError("You are not authorized to delete this review!")
      );
    }
  } else if (role == "super-admin") {
    next();
  } else {
    return next(new AppError("You are not authorized to delete this review!"));
  }
};

module.exports = canDeleteReview;
