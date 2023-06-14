const express = require("express");
const router = express.Router();

const reviewValidation = require("../utils/reviewValidation");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

// create review for a post (req must include user._id & post._id)
router.post("/", reviewValidation, createReview);

// get reviews for a post (req must include post._id)
router.get("/", getReviews);

// update a review in a post (must provide review body in req & review id in params)
router.put("/:id", reviewValidation, updateReview);

// delete a review from a post (must provide review id in params)
router.delete("/:id", reviewValidation, deleteReview);

module.exports = router;
