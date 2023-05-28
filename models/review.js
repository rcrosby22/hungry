const mongoose = require('mongoose');
  
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);









 module.exports = mongoose.model('Review', reviewSchema);
