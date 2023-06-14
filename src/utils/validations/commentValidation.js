const Joi = require("joi");

const AppError = require("../AppError");

const commentValidationSchema = Joi.object({
  comment: Joi.string().required()
});

const commentValidation = (req, res, next) => {
  const { comment } = req.body;
  const { error } = commentValidationSchema.validate({ comment: comment });
  if (error) return next(new AppError("Please provide a comment"));
  next();
};

module.exports = commentValidation;
