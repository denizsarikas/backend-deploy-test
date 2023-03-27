

//import model
const Blog = require('../models/blogModel')

//import mongoose
const mongoose = require('mongoose')


//GET blogs
const getBlogs = async (req, res) => {

    const blogs = await Blog.find({}).sort({createdAt: -1})
    
    //res.status(200).json('OK')
    res.status(200).json(blogs)
        
}

//Create a new blog
const createBlog = async (req, res) => {

    const {title, content} = req.body

    let emptyFields = []

    if(!title) {
      emptyFields.push('title')
    }
    if(!content) {
      emptyFields.push('content')
    }

    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
  try {
    //const user_id = req.user._id
    const blog = await Blog.create({title, content})
    res.status(200).json(blog)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

// DELETE a BLOG
const deleteBlog = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such blog'})
    }
  
    const blog = await Blog.findOneAndDelete({_id: id})
  
    if (!blog) {
      return res.status(400).json({error: 'No such blog'})
    }
    if (!req.user || blog.author !== req.user._id) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    //res.status(200).json(blog)
    res.status(200).json({ 
        blog,
        message: 'Blog post successfully deleted' 
      })
  }


// update a blog
const updateBlog = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such blog'})
    }
  
    const blog = await Blog.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!blog) {
      return res.status(400).json({error: 'No such blog'})
    }
  
    res.status(200).json({blog, message: 'This blog succesfully updated.'})
  }

//exports
module.exports = {
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog,
}