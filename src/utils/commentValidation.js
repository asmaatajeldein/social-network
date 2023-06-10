const Joi = require("joi");

const AppError = require("./AppError");

const commentValidationSchema = Joi.object({
  body: Joi.string()
});

const commentValidation = (req, res, next) => {
  const { body } = req.body;
  const { error } = commentValidationSchema.validate({ body: body });
  if (error) return next(new AppError("Please provide a comment body"));
  next();
};

module.exports = commentValidation;
