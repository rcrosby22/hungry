const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// router.get('/:id', recipeCtrl.show)

// POST /movies/:id/reviews (create review for a movie)
router.post('/recipes/:id/reviews', ensureLoggedIn,reviewsCtrl.create);

router.delete('/recipes/:id', ensureLoggedIn, reviewsCtrl.delete)
module.exports = router;