const express = require("express");
const {
  upload,
  addProductController,
  productsController,
  filterController,
  filterSubController,
  singleProductController,
} = require("../controllers/Product");
const router = express.Router();

// Route for adding a new product with photo uploads
router.post("/newproduct", upload, addProductController); // Using the same endpoint for upload and creation
router.get("/allproduct", productsController); // Using the same endpoint for upload and creation
router.get("/filterproduct/:category", filterController); // Using the same endpoint for upload and creation
router.get("/:subcategory", filterSubController); // Using the same endpoint for upload and creation
router.get("/singleproduct/:id", singleProductController); // Using the same endpoint for upload and creation

module.exports = router;
