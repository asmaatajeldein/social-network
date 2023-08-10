const express = require("express");
const router = express.Router();

const reviewValidation = require("../utils/validations/reviewValidation");

const verifyToken = require("../middlewares/verifyToken");
const canUpdateReview = require("../middlewares/review/canUpdateReview");
const canCreateReview = require("../middlewares/review/canCreateReview");
const canDeleteReview = require("../middlewares/review/canDeleteReview");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

// create review for a post (req must include user._id & post._id)
router.post("/", verifyToken, reviewValidation, canCreateReview, createReview);

// get reviews for a post (req must include post._id)
router.get("/", verifyToken, getReviews);

// update a review in a post (must provide review body in req & review id in params)
router.put("/:id", canUpdateReview, reviewValidation, updateReview);

// delete a review from a post (must provide review id in params)
router.delete("/:id", verifyToken, canDeleteReview, deleteReview);

module.exports = router;
