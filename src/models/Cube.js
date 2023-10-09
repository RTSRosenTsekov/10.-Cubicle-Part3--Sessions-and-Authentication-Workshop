const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  difficultyLevel: Number,

  // Relationship one to many
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory", // the name of the model
    },
  ],
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
