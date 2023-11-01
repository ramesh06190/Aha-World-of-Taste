const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  reviewerId: {
    type: String,
    required: true,
  },
});

const dishSchema = new mongoose.Schema(
  {
    id: { type: String },
    foodName: { type: String },
    category: { type: String },
    likes: {
      type: [String],
      default: [],
    },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    ratings: {
      type: [ratingSchema],
      default: [], // Empty array as default value
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dish", dishSchema);
