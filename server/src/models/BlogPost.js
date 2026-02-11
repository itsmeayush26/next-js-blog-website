const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    content: {
        type: String, // HTML or Markdown
        required: true
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    featuredImage: {
        type: String
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
        index: true // Index for fast filtering by status
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
