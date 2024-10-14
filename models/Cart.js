// models/Product.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  designName: { type: String },
  description: { type: String },
  grossWeight: {
    type: String,
  },
  netWeight: {
    type: String,
  },
  price: Number,
  photoPaths: [String],
  userName: {
    type: String,
  },
  userMobile: {
    type: String,
  },

  // Store photo path here, not the image
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
