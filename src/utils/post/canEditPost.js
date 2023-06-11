const AppError = require("./AppError");
const jwt = require("jsonwebtoken");
const Post = require("../../models/Post");

const canEditPost = (req, res, next) => {
    const { post_id } = req.params;
    const post = Post.findById(post_id);

    const token = req.headers.authorization;
    if (!token) return next(new AppError("Please, provide a token!!", 400));
  
    // the id and role of the logged in user
    const { user_id, user_role } = jwt.verify(token, "mysecret");
  
    // checking if the user is updating his profile (not other user profile)
    // if his profile => next!
    // else check if he has a super-admin role
    if (user_id === post.author) {
      next();
    } else {
      if (user_role === "super-admin") {
        next();
      } else {
        return next(new AppError("You are not authorized!", 400));
      }
    }
  };
  
  module.exports = canEditPost;