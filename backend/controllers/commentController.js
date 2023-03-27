const Comment = require('../models/commentModel');

// GET all comments of a post
const getComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blog: blogId }).populate('author', 'email');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//POST COMMENT
const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.blogId;
    console.log(blogId)
    const user = req.user;

    if (!content) {
      return res.status(400).json({ error: 'Please provide comment content' });
    }

    const newComment = new Comment({
      content,
      author: user._id,
      blog: blogId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getComments,
  createComment,
};
