const express = require('express');
const { Post } = require('../models');
const postRouter = express.Router();

postRouter.post('/', async (req, res) => {
    try {
        const { title, content, comments } = req.body;
        const newPost = new Post({ title, content, comments });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
postRouter.get('/', async (req, res) => {
    try {
        const data = await Post.find()
        // .populate('comments.user', 'name');
        const result = data.map(post => {
            const { createdAt, updatedAt, __v, ...postData } = post._doc;
            return { ...postData };
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.messsage })
    }
});

postRouter.get('/comments/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId).select('comments').populate('comments.user', 'name email');
        const commentCount = post.comments.length;// dem so luong
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({
            
            "so luong binh luan": commentCount,
            "binh luan": post
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = postRouter;
