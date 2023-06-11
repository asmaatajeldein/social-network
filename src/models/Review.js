const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  review: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
