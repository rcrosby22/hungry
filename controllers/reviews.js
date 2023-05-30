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
      // Let Express display an error
      return next(err);
    });
  });
}

async function create(req, res) {

  const recipe = await Recipe.findById(req.params.id)

    // Add the user-centric info to req.body (the new review)
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











// // Create a review for a recipe
// exports.createReview = async (req, res) => {
//   try {
//     const { recipeId, rating, comment } = req.body;
//     const userId = req.user.id; // Assuming user authentication middleware is used

//     const recipe = await Recipe.findById(recipeId);

//     if (!recipe) {
//       return res.status(404).json({ error: 'Recipe not found' });
//     }

//     const review = new Review({ recipe: recipeId, user: userId, rating, comment });
//     await review.save();

//     recipe.reviews.push(review);
//     await recipe.save();

//     res.status(201).json({ review });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create review' });
//   }
// };
