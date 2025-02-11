const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    indexedDB: true
  },
  title: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  img: {
    type: Object,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
