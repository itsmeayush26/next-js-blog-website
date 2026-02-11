const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HeroSlide = require('./models/HeroSlide');
const BlogPost = require('./models/BlogPost');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Import into DB
const importData = async () => {
    try {
        await HeroSlide.deleteMany();
        await BlogPost.deleteMany();

        await HeroSlide.create([
            {
                title: 'Welcome to Giakaa',
                description: 'We build digital products that scale.',
                imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Tech/Abstract
                ctaText: 'Get Started',
                ctaLink: '/contact',
                order: 1,
                active: true
            },
            {
                title: 'Innovative Solutions',
                description: 'Transforming ideas into reality.',
                imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', // Cyber/Tech
                ctaText: 'Our Services',
                ctaLink: '/services',
                order: 2,
                active: true
            }
        ]);

        await BlogPost.create([
            {
                title: 'The Future of Web Development',
                slug: 'future-of-web-development',
                content: '<p>Web development is constantly evolving...</p>',
                metaTitle: 'Use Next.js for SEO',
                metaDescription: 'Learn why Next.js is the best choice for modern web apps.',
                featuredImage: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop', // Coding
                status: 'published'
            },
            {
                title: 'Why SEO Matters',
                slug: 'why-seo-matters',
                content: '<p>SEO is crucial for visibility...</p>',
                metaTitle: 'SEO Tips 2026',
                metaDescription: 'Top SEO strategies for this year.',
                featuredImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop', // Analytics
                status: 'published'
            },
            {
                title: 'Design Systems 101',
                slug: 'design-systems-101',
                content: '<p>Scaling design with consistency...</p>',
                metaTitle: 'Design Systems Guide',
                metaDescription: 'How to build scalable UI libraries for enterprise.',
                featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop', // Design
                status: 'published'
            }
        ]);

        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await HeroSlide.deleteMany();
        await BlogPost.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
