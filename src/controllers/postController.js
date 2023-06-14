const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Review = require("../models/Review");
const AppError = require("../utils/AppError");
const uploadToCloud = require("../utils/uploadToCloud");

const getUserPosts = async (req, res, next) => {
  // get all posts from database
  const author = req.user;
  if (!author) {
    next(new AppError("Invalid User", 400));
  }

  const posts = await Post.find({ author: author._id });

  res.send(posts);
};

const getPostById = async (req, res, next) => {
  // get post from database
  const { id } = req.params;
  if (!id) {
    next(new AppError("Invalid Post ID", 400));
  }

  const post = await Post.findById(id);
  if (!post) {
    next(new AppError("Post not found", 404));
  }
  // add comments and reviews middleware
  const comments = await Comment.find({ postId: post._id });

  const reviews = await Review.find({ postId: post._id });

  res.send({ post, comments, reviews });
};

const createPost = async (req, res, next) => {
  // console.log(req);
  if (req.file) {
    req.body.img_url = await uploadToCloud(req.file.path, {
      public_id: req.file.originalname
    });
  }
  const new_post = new Post({
    author: req.user._id,
    title: req.body.title,
    content: req.body.content,
    img_url: req.body.img_url?.secure_url,
    date: new Date(),
    status: req.body.status
  });
  await new_post.save();
  // console.log("data", req.body);
  res.send(new_post);
};

const editPostById = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, img_url, status } = req.body;
  await Post.findByIdAndUpdate(id, { title, content, img_url, status });

  res.send(await Post.findById(id));
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  await Comment.deleteMany({ postId: id });
  await Review.deleteMany({ postId: id });
  res.send("Post Deleted Successfully!");
};

const deletePosts = async (req, res) => {
  const { author } = req.body.author;
  const posts = await Post.find({ author });
  posts.forEach(async (post) => {
    await Comment.deleteMany({ postId: post._id });
    await Review.deleteMany({ postId: post._id });
  });
  await Post.deleteMany({ author: author });

  res.send("Posts Deleted Successfully!");
};

module.exports = {
  getUserPosts,
  getPostById,
  createPost,
  editPostById,
  deletePostById,
  deletePosts
};
