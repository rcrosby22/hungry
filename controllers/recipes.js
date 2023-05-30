
const Recipe = require('../models/recipe');


module.exports = {
  index,
  show,
  new: newRecipe,
  create
};

async function index(req, res) {
  const recipes = await Recipe.find({});
  res.render('recipes/index', { title: 'All Recipes', recipes });
}

// Show recipe details
async function show (req, res) {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId).populate('reviews');

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.render('show', { recipe });
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
    const { title, ingredients, instructions } = req.body;
    const createdBy = req.user.id; // Assuming user authentication middleware is used

    const recipe = await Recipe.create({ title, ingredients, instructions, createdBy });
    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};
