const express = require('express');
const router = express.Router();

const {getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, userblog} = require('../controllers/blogController');

router.get('/getall', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/createblog', createBlog);
router.put('/updateblog/:id', updateBlog);
router.delete('/deleteblog/:id', deleteBlog);
router.get('/userblog/:userId', userblog);

module.exports = router;