const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviewsCtrl');
const ensureLoggedIn = require('../config/ensureLoggedIn');



// POST /movies/:id/reviews (create review for a movie)
router.post('/recipes/:id/reviews', ensureLoggedIn,reviewsCtrl.create);

router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete)
module.exports = router;