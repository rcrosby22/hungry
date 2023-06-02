const Recipe = require('../models/recipe');


module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  Recipe.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  }).then(function (recipe) {
    
    if (!recipe) return res.redirect('/recipes');
    
    recipe.reviews.remove(req.params.id);
    // Save the updated recipe
    recipe.save().then(function () {
      // Redirect back to the recipe's show view
      res.redirect(`/recipes/${recipe._id}`);
    }).catch(function (err) {
      return next(err);
    });
  });
}

async function create(req, res) {

  const recipe = await Recipe.findById(req.params.id)

   
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    recipe.reviews.push(req.body);
    try {

      await recipe.save()
      res.redirect(`/recipes/${recipe._id}`)
    } catch (err) {
      res.redirect(`/recipes/${recipe._id}`)
    }
  };











