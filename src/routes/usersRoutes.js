const express = require("express");
const router = express.Router();

const verifyToken = require("../utils/verifyToken");
const verifyAdminRole = require("../utils/verifyAdminRole");

const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/authenticationController");

// getting all users
router.get("/", verifyToken, verifyAdminRole, getAllUsers);

// getting user by id
router.get("/:id", getUserById);

// create a new user (register)
router.post("/", register);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", verifyAdminRole, deleteUser);

// login
router.post("/login", login);

module.exports = router;
