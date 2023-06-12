const Joi = require("joi");
const AppError = require("./AppError");

// registeration
const registerSchema = Joi.object({
  username: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

const registerValidation = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error)
    return next(
      new AppError("The request didn't pass the validation test!", 401)
    );
  next();
};

module.exports = { registerValidation };
