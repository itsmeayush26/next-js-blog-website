const express = require('express');
const router = express.Router();
const {
    getBlogPosts,
    getBlogPostBySlug,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
} = require('../controllers/blogController');

const upload = require('../middleware/upload');

router.route('/')
    .get(getBlogPosts)
    .post(upload.single('image'), createBlogPost);

router.get('/:slug', getBlogPostBySlug);

router.route('/:id')
    .put(upload.single('image'), updateBlogPost)
    .delete(deleteBlogPost);

module.exports = router;
