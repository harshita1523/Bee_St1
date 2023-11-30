// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Add a new comment to a post
router.post('POST/api/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, author } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = { content, author };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve all comments for a specific post
router.get('GET/api/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = post.comments;
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a comment by ID within a post
router.put('PUT/api/posts/:postId/comments/:commentId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { content, author } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const commentToUpdate = post.comments.id(commentId);
    if (!commentToUpdate) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    commentToUpdate.content = content;
    commentToUpdate.author = author;
    await post.save();

    res.status(200).json(commentToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a comment by ID within a post
router.delete('DELETE/api/posts/:postId/comments/:commentId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.pull(commentId);
    await post.save();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
