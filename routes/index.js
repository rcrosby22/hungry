var express = require('express');
var router = express.Router();
const passport = require('passport')
const recipesCtrl = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/new', ensureLoggedIn, recipesCtrl.new);

router.get('/', function(req, res, next) {
  res.redirect('/recipes');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
))
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/recipes',
    
    failureRedirect: '/recipes'
  }
))

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/recipes');
  });
});
module.exports = router;