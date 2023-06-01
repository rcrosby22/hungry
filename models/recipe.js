const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },

},
{
  timestamps: true
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  createdBy: { type:Schema.Types.ObjectId, ref: 'User' },
  reviews: [reviewSchema],
  image: { type: String}
},
{
  timestamps: true
}
);




module.exports = mongoose.model('Recipe',recipeSchema);


