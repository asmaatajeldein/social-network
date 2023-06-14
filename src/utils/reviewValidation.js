const Joi = require("joi");

const AppError = require("./AppError");

const reviewValidationSchema = Joi.object({
  review: Joi.number().min(1).max(5).required()
});

const reviewValidation = (req, res, next) => {
  const { review } = req.body;
  const { error } = reviewValidationSchema.validate({ review: review });
  if (error) return next(new AppError("Please provide a review"));
  next();
};

module.exports = reviewValidation;
