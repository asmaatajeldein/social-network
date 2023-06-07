const User = require("../models/User");
const AppError = require("../utils/AppError");

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new AppError("User Not Found!", 400));
  res.send(user);
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const createdUser = await User.create({
    user_name: username,
    email,
    password,
  });
  res.send({ message: "user created successfully!", user: createdUser });
};

const updateUser = (req, res, next) => {
  res.send({ message: "user updated successfully!" });
};

const deleteUser = (req, res, next) => {
  res.send({ message: "user deleted successfully!" });
};

const login = (req, res, next) => {
  res.send({ message: "user logged in successfully!" });
};

module.exports = {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
};
