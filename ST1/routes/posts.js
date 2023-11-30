const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');


router.post('POST/api/posts', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const newPost = await Post.create({ title, content, author, tags });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve all posts
router.get('GET/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a specific post by ID
router.get('GET/api/posts/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a post by ID
router.put('PUT/api/posts/:postId', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content, author, tags }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a post by ID
router.delete('DELETE/api/posts/:postId', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
