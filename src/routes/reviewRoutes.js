const express = require("express");
const router = express.Router();

const reviewValidation = require("../utils/validations/reviewValidation");

const verifyToken = require("../utils/verifyToken");
const canUpdateReview = require("../utils/review/canUpdateReview");
const canCreateReview = require("../utils/review/canCreateReview");

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
router.delete("/:id", verifyToken, reviewValidation, deleteReview);

module.exports = router;
