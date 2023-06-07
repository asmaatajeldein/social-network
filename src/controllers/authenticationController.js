const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = (req, res, next) => {
  res.send({ message: "the specific user returned!" });
};

const register = (req, res, next) => {
  res.send({ message: "user created successfully!" });
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
