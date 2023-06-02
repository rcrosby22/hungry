const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /
router.get('/', recipesCtrl.index);

// GET /recipes/new
router.get('/new', ensureLoggedIn, recipesCtrl.new);


router.get('/:id', recipesCtrl.show);

// POST /recipes
router.post('/', ensureLoggedIn, recipesCtrl.create);

router.delete('/:id', ensureLoggedIn, recipesCtrl.delete)

module.exports = router;
