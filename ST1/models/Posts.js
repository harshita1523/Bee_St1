const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Other fields as needed for comments
});

const Posts = mongoose.model('Post', {
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  author: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    maxlength: 50
  }],
  comments: [commentSchema]
});

module.exports = Posts;
