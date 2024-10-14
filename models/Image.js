const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imagePaths: [String], // Array of image paths
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
