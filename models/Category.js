const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields automatically
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
