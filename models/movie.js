const mongoose = require("mongoose");


//Define the schema for a movie review
const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String, 
      required: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //Reference to a user in the User model
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the schema for a movie
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  reviews: [reviewSchema],//An array of reviews using the defind reviewSchema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);