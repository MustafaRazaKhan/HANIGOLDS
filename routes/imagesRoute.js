const express = require("express");
const {
  images,
  addImageController,
  imagesController,
  deleteController,
} = require("../controllers/Images");
const router = express.Router();

// Route for adding a new product with photo uploads
router.post("/newimage", images, addImageController); // Using the same endpoint for upload and creation
router.get("/allimage", imagesController); // Using the same endpoint for upload and creation
router.delete("/deleteimage", deleteController); // Using the same endpoint for upload and creation

module.exports = router;
