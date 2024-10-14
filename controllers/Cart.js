const multer = require("multer");
const path = require("path");
const Cart = require("../models/Cart");
const fs = require("fs"); // Adjust the import based on your project structure
const Product = require("../models/Product");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// !Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "cartuploads/";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// todo Initialize multer with the storage configuration
// const uploadCart = multer({ storage: storage }).single("photo");
// Allow up to 10 photos

// ? Controller to handle the product addition
const addCartController = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const { id } = req.body;

    // Verify token

    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    // Find the product by ID
    const existingProduct = await Product.findOne({ _id: id });
    if (!existingProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Find the user by ID from the decoded token
    const userInfo = await User.findOne({ _id: decoded.id });
    if (!userInfo) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create a new cart item with the relevant fields
    const newCart = new Cart({
      category: existingProduct.category,
      subCategory: existingProduct.subCategory,
      designName: existingProduct.designName,
      grossWeight: existingProduct.grossWeight,
      netWeight: existingProduct.netWeight,
      description: existingProduct.description,
      price: existingProduct.price,
      userName: userInfo.name,
      userMobile: userInfo.mobile,
      photoPaths: existingProduct.photoPaths, // Store the file paths
    });

    // Save the cart item to the database
    const savedCart = await newCart.save();

    // Send response
    res.status(201).json({
      success: true,
      msg: "Item added successfully to your cart!",
      savedCart,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ msg: "Server error", error });
  }
};

const cartController = async (req, res) => {
  try {
    const allCart = await Cart.find({});
    if (allCart) {
      return res.status(200).send({
        success: true,
        msg: "all cart items get Successfully!",
        allCart,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

// Export the controller and multer middleware
module.exports = {
  addCartController,
  cartController,
};
