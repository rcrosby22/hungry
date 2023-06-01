
const Recipe = require('../models/recipe');


module.exports = {
  index,
  show,
  new: newRecipe,
  create,
  delete: deleteRecipe
};

async function index(req, res) {
  const recipes = await Recipe.find({});
  res.render('recipes/index', { title: 'All Recipes', recipes });
}

// Show recipe details
async function show (req, res) {
  try {
    const {id} = req.params

    const recipe = await Recipe.findById(id).populate('reviews');

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.render('recipes/show', { title: 'Details', recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
};

// Render the new recipe form
function newRecipe (req, res) {
  res.render('new', { title: 'Create a New Recipe' });
};

// Create a new recipe
async function create  (req, res) {

  try {
    
    const { title, ingredients, instructions, image } = req.body;
    const createdBy = req.user.id; // Assuming user authentication middleware is used

    await Recipe.create({ title, ingredients, instructions, createdBy, image });
    
    res.redirect('/recipes');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }

function deleteRecipe(req, res, next) {
  Recipe.findOne({'recipes._id': req.params.id, 'recipes.user':req.user._id}).then
  (function(recipe) {
    if (!recipe) return res.redirect('/recipes')
    recipe.remove(req.params.id)
  })
}

  };
async function deleteRecipe (req, res, next) {
  try {
    const recipeId = req.params.id;
    
    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);
    
    console.log(recipe.createdBy)
    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // user needs to be logged in and match
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Delete the recipe
    await Recipe.findByIdAndDelete(recipeId);

    res.redirect('/recipes')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
