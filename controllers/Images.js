const multer = require("multer");
const path = require("path");
const Image = require("../models/Image");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "images/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// todo Initialize multer with the storage configuration
const images = multer({ storage: storage }).array("images", 60); // Allow up to 10 photos

const addImageController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, msg: "No files uploaded" });
    }

    const files = req.files.map((file) => file.path);
    const newImage = new Image({
      imagePaths: files, // Store the file paths in the database
    });

    const savedImage = await newImage.save();
    res.status(201).json({
      success: true,
      msg: "Images added successfully!",
      savedImage,
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      // Handle multer-specific errors
      return res
        .status(400)
        .json({ success: false, msg: "Multer error occurred" });
    }
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};

const imagesController = async (req, res) => {
  try {
    const allImages = await Image.find({});
    if (allImages) {
      return res.status(200).send({
        success: true,
        msg: "allImages get Successfully!",
        allImages,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};
const deleteController = async (req, res) => {
  const { id } = req.params; // Assuming you're passing the product ID as a URL parameter

  try {
    // Find the product to get the associated images
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    // Delete images from the file system
    for (const imagePath of product.imagePaths) {
      const fullPath = path.join(
        __dirname,
        "../images",
        path.basename(imagePath)
      );
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${fullPath}`, err);
        } else {
          console.log(`Deleted file: ${fullPath}`);
        }
      });
    }

    // Now delete the product from the database
    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};
module.exports = {
  addImageController,
  imagesController,
  deleteController,
  images,
};
