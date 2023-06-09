const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
