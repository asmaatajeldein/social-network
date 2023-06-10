const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const {tokenAuth} = require('../utils/jwtAuth');


// Get Requests

// get all posts of a user
router.get('/', tokenAuth, async (req,res)=>{
	// get all posts from database
	const {owner} = req.body;
	// console.log(owner);
	const posts = await Post.find({owner});

    /***  should add comments  & reviews before sending the response ***/
    /***  make it as middleware since we going to use it in all get req. ***/

    /* 
    * Assuming, var friend = { firstName: 'Harry', lastName: 'Potter' };
    * Update the model in-memory, and save (plain javascript array.push):

    * person.friends.push(friend);
    * person.save(done); 
    */

	res.send(posts);
})

// get post by id
router.get('/:id', tokenAuth, async (req,res)=>{
	// get post from database
    const {id}= req.params;
    if(!id){next(new AppError('Invalid Post ID',404));}
	const {} = req.body;
	// console.log(owner);
	const post = await Post.findById(id);
    if(!post){next(new AppError('Post not found',404));}
    // add comments and reviews middleware

	res.send(post);
});

// POST requests

router.post('/', tokenAuth, async (req,res)=>{
    const new_post = new Post({
        author: req.body.owner,
        title:req.body.title,
        content:req.body.content,
        img_url:req.body.img_url,
		date:new Date(),
        status:req.body.status
    });
    await new_post.save();
	console.log('data',req.body)
	res.status(200).send(new_post);
});

// UPDATE & PATCH requests

router.patch('/:id', tokenAuth, async (req,res)=>{
	const {id}= req.params;
	const {title, content, img_url, status}= req.body;
	await Post.findByIdAndUpdate(id,{title, content, img_url, status});

	res.status(200).send(await Post.findById(id));
})

// DELETE requests
router.delete('/:id', tokenAuth, async(req,res)=>{
	const {id}= req.params;
	await Post.findByIdAndDelete(id);
	// delete todo by id
	res.send('todo deleted')
});






module.exports = router;

