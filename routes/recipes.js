const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /
router.get('/', recipesCtrl.index);

// GET /recipes/new
router.get('/new', ensureLoggedIn, recipesCtrl.new);

// GET /recipes/:id (show functionality) MUST be below new route
router.get('/:id', recipesCtrl.show);

// POST /recipes
router.post('/', ensureLoggedIn, recipesCtrl.create);

module.exports = router;
