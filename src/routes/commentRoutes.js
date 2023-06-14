const express = require("express");
const router = express.Router();

const commentValidation = require("../utils/validations/commentValidation");

const verifyToken = require("../utils/verifyToken");
const canUpdateComment = require("../utils/comment/canUpdateComment");
const canDeleteComment = require("../utils/comment/canDeleteComment");

const {
  createComment,
  getComments,
  updateComment,
  deleteComment
} = require("../controllers/commentController");

// create comment for a post (req must include user._id & post._id)
router.post("/", commentValidation, verifyToken, createComment);

// get comments for a post (req must include post._id)
router.get("/", verifyToken, getComments);

// update a comment in a post (must provide comment body in req & comment id in params)
router.put("/:id", commentValidation, canUpdateComment, updateComment);

// delete a comment from a post (must provide comment id in params)
router.delete("/:id", canDeleteComment, deleteComment);

module.exports = router;
