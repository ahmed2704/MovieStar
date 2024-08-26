const mongoose = require("mongoose");

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  reviews: [reviewSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);