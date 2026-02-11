const HeroSlide = require('../models/HeroSlide');

// @desc    Get all active hero slides
// @route   GET /api/hero
// @access  Public
const getHeroSlides = async (req, res) => {
    try {
        const slides = await HeroSlide.find({ active: true }).sort({ order: 1 });
        res.json(slides);
    } catch (error) {
        console.error(`Error in getHeroSlides: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a hero slide
// @route   POST /api/hero
// @access  Private (Admin)
const createHeroSlide = async (req, res) => {
    try {
        if (req.file) {
            req.body.imageUrl = req.file.path;
        }
        const slide = await HeroSlide.create(req.body);
        res.status(201).json(slide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a hero slide
// @route   PUT /api/hero/:id
// @access  Private (Admin)
const updateHeroSlide = async (req, res) => {
    try {
        if (req.file) {
            req.body.imageUrl = req.file.path;
        }
        const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!slide) {
            return res.status(404).json({ message: 'Slide not found' });
        }
        res.json(slide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a hero slide
// @route   DELETE /api/hero/:id
// @access  Private (Admin)
const deleteHeroSlide = async (req, res) => {
    try {
        const slide = await HeroSlide.findByIdAndDelete(req.params.id);
        if (!slide) {
            return res.status(404).json({ message: 'Slide not found' });
        }
        res.json({ message: 'Slide removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHeroSlides,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
};
