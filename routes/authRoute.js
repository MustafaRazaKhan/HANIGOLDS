const express = require("express");
const { registerController, loginController } = require("../controllers/Auth");
const router = express.Router(); // Corrected this line

// todo register a new user

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
