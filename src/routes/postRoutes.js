const express = require("express");
const router = express.Router();

// const multer = require("multer");
// const path = require("path");
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/data/posts_images/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
//   }
// });
// const upload = multer({ storage: "public/data/posts_images/" });

const upload = require("../utils/multer");

const {
  getUserPosts,
  getPostById,
  createPost,
  editPostById,
  deletePostById,
  deletePosts
} = require("../controllers/postController");
const verifyToken = require("../middlewares/verifyToken");
const canViewPost = require("../middlewares/post/canViewPost");
const canEditPost = require("../middlewares/post/canEditPost");

// Get Requests

// get all posts of a user
router.get("/", verifyToken, getUserPosts);

// get post by id
router.get("/:id", canViewPost, getPostById);

// POST requests
router.post("/", verifyToken, upload.single("post_img"), createPost);

// UPDATE & PATCH requests
router.put("/:id", canEditPost, editPostById);
router.patch("/:id", canEditPost, editPostById);

// DELETE requests

// delete post by id
router.delete("/:id", canEditPost, deletePostById);

// delete posts by userId
router.delete("/", canEditPost, deletePosts);

module.exports = router;
