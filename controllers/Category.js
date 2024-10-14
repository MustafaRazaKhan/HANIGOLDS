const Category = require("../models/Category");
const User = require("../models/User");
// todo to add a new user

const addCategoryController = async (req, res) => {
  const { category, subCategory } = req.body;
  console.log(category, subCategory);
  try {
    if (!category || category.length >= 100) {
      return res.status(400).send({
        success: false,
        msg: "Category length is longer",
      });
    }

    if (!subCategory || subCategory.length > 100) {
      return res.status(400).send({
        success: false,
        msg: "SubCategory length is longer",
      });
    }

    // Validation checks

    // Check for existing user
    const newCategory = await Category({
      category,
      subCategory,
    });
    const savedCategory = await newCategory.save();
    if (savedCategory) {
      return res.status(200).send({
        success: true,
        msg: "category added Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

// todo  get all category
const allCategoryController = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    if (allCategory) {
      return res.status(200).send({
        success: true,
        msg: "allCategory get Successfully!",
        allCategory,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

// get single category
const getCategoryController = async (req, res) => {
  const id = req.params.id;
  try {
    // Validation checks

    // Check for existing user
    const category = await Category.findOne({ _id: id });
    if (category) {
      return res.status(200).send({
        success: true,
        msg: "category get Successfully!",
        category,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};
// const updateCategoryController = async (req, res) => {
//   const id = req.params.id;
//   const { mobile, name, address, isAdmin, isVerified } = req.body; // Add the fields you want to update

//   try {
//     // Validation checks (optional, add your own)

//     // Check for and update the existing user
//     const updatedUser = await User.findByIdAndUpdate(
//       id, // Find user by ID
//       {
//         // Update data
//         mobile: mobile,
//         name: name,
//         address: address,
//         isAdmin: isAdmin,
//         isVerified: isVerified,
//       },
//       { new: true } // Return the updated document
//     );

//     if (updatedUser) {
//       return res.status(200).send({
//         success: true, // This should be true if the update is successful
//         msg: "User updated successfully!",
//         updatedUser,
//       });
//     } else {
//       return res.status(404).send({
//         success: false,
//         msg: "User not found",
//       });
//     }
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       msg: "Server error: " + error.message,
//     });
//   }
// };

const deleteCategoryController = async (req, res) => {
  const id = req.params.id;
  // Add the fields you want to update

  try {
    // Validation checks (optional, add your own)

    // Check for and update the existing user
    const deleteCategory = await Category.findByIdAndDelete(
      { _id: id }
      // Find user by ID
      // Return the updated document
    );

    if (deleteCategory) {
      return res.status(200).send({
        success: true, // This should be true if the update is successful
        msg: "category  deleted successfully!",
      });
    } else {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

module.exports = {
  deleteCategoryController,
  allCategoryController,
  getCategoryController,
  addCategoryController,
};
