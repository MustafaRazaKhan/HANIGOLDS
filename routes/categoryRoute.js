const express = require("express");
const {
  deleteCategoryController,
  allCategoryController,
  getCategoryController,
  addCategoryController,
} = require("../controllers/Category");
const router = express.Router(); // Corrected this line

// todo register a new user

router.post("/newcat", addCategoryController);
router.get("/allcategory", allCategoryController);
router.get("/singlecategory/:id", getCategoryController);
router.delete("/deletecategory/:id", deleteCategoryController);
// router.post("/login", loginController);

module.exports = router;
