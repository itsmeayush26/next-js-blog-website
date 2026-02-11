const express = require('express');
const router = express.Router();
const {
    getHeroSlides,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
} = require('../controllers/heroController');

const upload = require('../middleware/upload');

router.route('/')
    .get(getHeroSlides)
    .post(upload.single('image'), createHeroSlide);

router.route('/:id')
    .put(upload.single('image'), updateHeroSlide)
    .delete(deleteHeroSlide);

module.exports = router;
