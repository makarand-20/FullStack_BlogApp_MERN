const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// get all blogs
const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({}).select('-__v -createdAt -updatedAt');

    if (blogs) {
        res.status(200).json({
            BlogCount: blogs.length,
            blogs
        });
    }
    else {
        res.status(404).json({ message: 'No blogs found!' });
    }
};

// get blog by id
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).select('-__v -createdAt -updatedAt');
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: 'No blog found!' });
    }
}

const createBlog = async (req, res) => {
    const {title, body, image, userId} = req.body;

    //validation
    if (!title || !body || !image || !userId) {
        return res.status(400).json({ message: 'Please enter all fields!' });
    }

    //check if user exists
    const checkUser = await User.findById(userId);
    if (!checkUser) {
        return res.status(404).json({ message: 'User not found!' });
    }

    //create new blog
    const newBlog = new Blog({title, body, image, userId});

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({session});
    checkUser.blogs.push(newBlog);
    await checkUser.save({session});
    await session.commitTransaction();

    //save blog
    const savedBlog = await newBlog.save();

    //return saved blog
    res.status(201).json(savedBlog);

}

const updateBlog = async (req, res) => {

    const {id}  = req.params;
    const {title, body, image} = req.body;

    //validation
    if (!title || !body || !image) {
        return res.status(400).json({ message: 'Please enter all fields!' });
    }

    //update blog
    const blog = await Blog.findByIdAndUpdate(id, {...req.body}, {new: true}).select('-__v -createdAt -updatedAt');

    //return updated blog
    res.status(200).json({
        message: 'Blog updated successfully!',
        blog
    });
}

//delete blog
const deleteBlog = async (req, res) => {
    const {id} = req.params;

    //delete blog
    const blog = await Blog.findByIdAndDelete(id).populate('userId');
    await blog.userId.blogs.pull(blog);
    await blog.userId.save();

    //return response
    res.status(200).json({ message: 'Blog deleted successfully!' });
}

//get user blog
const userblog = async (req, res) => {
    const {userId} = req.params;

    //get user blog
    const blogs = await Blog.find({userId}).select('-__v -createdAt -updatedAt');

    //return response
    res.status(200).json({
        BlogCount: blogs.length,
        blogs
    });
}

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    userblog
}
