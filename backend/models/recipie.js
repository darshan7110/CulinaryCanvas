const mongoose = require("mongoose");

const recipieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], // Better than using Array directly
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      default: "", // Optional: fallback if image not provided
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipies", recipieSchema);
