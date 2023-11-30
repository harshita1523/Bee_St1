const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 1000
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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
