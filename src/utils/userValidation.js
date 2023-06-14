const Joi = require("joi");
const AppError = require("./AppError");

// registration
const registerSchema = Joi.object({
  username: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

// login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

// update
const updateSchema = Joi.object({
  username: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  role: Joi.string().valid("user", "admin", "super-admin"),
}).min(1);

const registerValidation = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error)
    return next(
      new AppError("The request didn't pass the validation test!", 401)
    );
  next();
};

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError("The data enetered is not valid!", 401));
  next();
};

const updateValidation = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) return next(new AppError("The data enetered is not valid!", 401));
  next();
};

module.exports = { registerValidation, loginValidation, updateValidation };
