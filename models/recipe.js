const mongoose = require('mongoose');
const Schema = mongoose.Schema

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const reviewSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipeSchema);


