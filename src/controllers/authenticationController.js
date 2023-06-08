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

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new AppError("User Not Found", 400));

  const update = {};
  update.user_name = req.body.user_name ? req.body.user_name : user.user_name;
  update.email = req.body.email ? req.body.email : user.email;
  update.password = req.body.password ? req.body.password : user.password;
  update.role = req.body.role ? req.body.role : user.role;

  const editedUser = await User.findByIdAndUpdate(id, update, { new: true });
  res.send({ message: "user updated successfully!", editedUser });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new AppError("User Not Found!", 400));

  const deletedUser = await User.findByIdAndDelete(id);

  res.send({ message: "user deleted successfully!", deletedUser });
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
