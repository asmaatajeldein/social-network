const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/authenticationController");

// getting all users
router.get("/", getAllUsers);

// getting user by id
router.get("/:id", getUserById);

// create a new user (register)
router.post("/", register);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// login
router.post("/login", login);

module.exports = router;
