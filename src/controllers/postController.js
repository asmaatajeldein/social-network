const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getUserPosts = async (req, res) => {
	// get all posts from database
	const { author } = req.user;
    if(!author) {next(new AppError("Invalid User",400));}

	const posts = await Post.find({ author: author._id });

    posts.forEach(async (element, index) => {
        const comments = await Comment.find({post: posts[index]._id});
        posts[index].comments = comments;
        /***  should add comments  & reviews before sending the response ***/
	    /***  make it as middleware since we going to use it in all get req. ***/
    });

	res.send(posts);
};

const getPostById = async (req, res) => {
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

	res.send(post);
};

const createPost = async (req, res) => {
	const new_post = new Post({
		author: req.user._id,
		title: req.body.title,
		content: req.body.content,
		img_url: req.body.img_url,
		date: new Date(),
		status: req.body.status,
	});
	await new_post.save();
	// console.log("data", req.body);
	res.send(new_post);
};

const editPostById = async (req, res) => {
	const { id } = req.params;
	const { title, content, img_url, status } = req.body;
	await Post.findByIdAndUpdate(id, { title, content, img_url, status });

	res.send(await Post.findById(id));
};

const deletePostById = async (req, res) => {
	const { id } = req.params;
	await Post.findByIdAndDelete(id);
	
	res.send("Post Deleted Successfully!");
};

const deletePosts = async (req, res) => {
	const { user } = req.user;
	await Post.find(id);
	//////////////////////////////// NEED ATTENTION ///////////////////////////
	res.send("Post Deleted Successfully!");
};

module.exports = {
	getUserPosts,
	getPostById,
	createPost,
	editPostById,
	deletePostById,
    deletePosts
};
