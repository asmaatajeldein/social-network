const express = require("express");
const router = express.Router();

const {
  createComment,
  getComments
} = require("../controllers/commentController");

// create comment for a post (req must include user._id & post._id)
router.post("/", createComment);

// get comments for a post (req must include post._id)
router.get("/", getComments);

// update a comment in a post (must provide comment body in req & comment id in params)
router.put("/:id", getComments);

// delete a comment from a post (must provide comment id in params)
router.delete("/:id", getComments);

module.exports = router;
