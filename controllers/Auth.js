const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// todo to add a new user

const registerController = async (req, res) => {
  const { mobile, password, name, address } = req.body;

  try {
    // Validation checks
    if (!mobile || mobile.length > 10) {
      return res.status(400).send({
        success: false,
        msg: "Mobile number should be exactly 10 digits",
      });
    }

    if (!password || password.length === 0) {
      return res.status(400).send({
        success: false,
        msg: "Please provide a password",
      });
    } else if (password.length > 20) {
      return res.status(400).send({
        success: false,
        msg: "Password should not exceed 20 characters",
      });
    }

    if (!name || name.length > 100) {
      return res.status(400).send({
        success: false,
        msg: "Name should not exceed 100 characters",
      });
    }

    if (!address || address.length === 0) {
      return res.status(400).send({
        success: false,
        msg: "Please provide an address",
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ mobile: mobile });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        msg: "User Already exsist!",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      mobile: Number(mobile), // Store as string if mobile numbers may have leading zeros
      password: hashPassword,
      name,
      address,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).send({
        success: true,
        msg: "Account created successfully! We will notify you shortly.",
        // token,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};

// login conrollers
const loginController = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    // Validation checks
    if (!mobile || mobile.length > 10) {
      return res.status(400).send({
        success: false,
        msg: "Mobile number should be exactly 10 digits",
      });
    }

    if (!password || password.length === 0) {
      return res.status(400).send({
        success: false,
        msg: "Please provide a password",
      });
    } else if (password.length > 20) {
      return res.status(400).send({
        success: false,
        msg: "Password should not exceed 20 characters",
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ mobile: Number(mobile) });
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        msg: "Envalid Credentails User is Already Exsist",
      });
    }
    // console.log(existingUser);

    const originalPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!originalPassword) {
      return res.status(400).send({
        success: false,
        msg: "Envalid Credentails mobile or password !",
      });
    }
    if (existingUser) {
      // Define the secret key

      // Generate the token (without including the plain text password)
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "7d" }
      );

      return res.status(200).send({
        success: true,
        msg: "Login Successfully",
        token,
        existingUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

module.exports = { registerController, loginController };
