const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

const verifyToken = require("../utils/verifyToken"); // logged in users, admins, or super admins
const verifyAdminRole = require("../utils/verifyAdminRole"); // admins & super admins
const canUpdateRole = require("../utils/verifySuper"); // only super admins
const canUpdateProfile = require("../utils/canUpdateProfile"); // only you or a super-admin can update your profile info

// validation middlewares
const {
  registerValidation,
  updateValidation,
} = require("../utils/userValidation");

const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
  updateProfilePic,
} = require("../controllers/authenticationController");

// upload profile pic
router.patch(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  verifyToken,
  updateProfilePic
);

// getting all users
router.get("/", verifyToken, verifyAdminRole, getAllUsers);

// getting user by id
router.get("/:id", verifyToken, getUserById);

// create a new user (register)
router.post("/", registerValidation, register);

// update user
router.patch(
  "/:id",
  updateValidation,
  verifyToken,
  canUpdateProfile,
  canUpdateRole,
  updateUser
);

// delete user
router.delete("/:id", verifyToken, verifyAdminRole, deleteUser);

// login
router.post("/login", login);

module.exports = router;
