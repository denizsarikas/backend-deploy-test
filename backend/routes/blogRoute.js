//initialize express
const express = require("express")

//controller imports
const {
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog,
} = require("../controllers/blogController");

//middleware imports
const requireAuth = require("../middleware/requireAuth");


//initialize router
const router = express.Router()

//require auth with imported middleware if necessary
router.use(requireAuth);


//GET all blogs
router.get("/", getBlogs);

// POST a new blog post
router.post("/", createBlog);

// DELETE a blog post
router.delete("/:id", deleteBlog);

// UPDATE a blog post
router.patch("/:id", updateBlog);




//exports
module.exports = router