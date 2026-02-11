const BlogPost = require('../models/BlogPost');

// @desc    Get all published blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        // status: 'published' filter for public view. Admin view might need a different endpoint or param.
        const posts = await BlogPost.find({ status: 'published' })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await BlogPost.countDocuments({ status: 'published' });

        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error(`Error in getBlogPosts: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogPostBySlug = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private (Admin)
const createBlogPost = async (req, res) => {
    try {
        if (req.file) {
            req.body.featuredImage = req.file.path;
        }
        const post = await BlogPost.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
const updateBlogPost = async (req, res) => {
    try {
        if (req.file) {
            req.body.featuredImage = req.file.path;
        }
        const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
const deleteBlogPost = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogPosts,
    getBlogPostBySlug,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
};
