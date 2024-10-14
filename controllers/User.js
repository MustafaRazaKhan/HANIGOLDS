const User = require("../models/User");
// todo to add a new user

const usersController = async (req, res) => {
  try {
    // Validation checks

    // Check for existing user
    const allUser = await User.find({});
    if (allUser) {
      return res.status(200).send({
        success: true,
        msg: "All User get Successfully!",
        allUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

// login conrollers
const userController = async (req, res) => {
  const id = req.params.id;
  try {
    // Validation checks

    // Check for existing user
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).send({
        success: true,
        msg: "User get Successfully!",
        user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};
const userUpdateController = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // Add the fields you want to update

  try {
    // Validation checks (optional, add your own)

    // Check for and update the existing user
    const updatedUser = await User.findByIdAndUpdate(
      id, // Find user by ID
      {
        // Update data

        isVerified: true,
      },
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      return res.status(200).send({
        success: true, // This should be true if the update is successful
        msg: "User updated successfully!",
        updatedUser,
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
const userDeleteController = async (req, res) => {
  const id = req.params.id;
  // Add the fields you want to update

  try {
    // Validation checks (optional, add your own)

    // Check for and update the existing user
    const deleteUser = await User.findByIdAndDelete(
      { _id: id }
      // Find user by ID
      // Return the updated document
    );

    if (deleteUser) {
      return res.status(200).send({
        success: true, // This should be true if the update is successful
        msg: "User deleted successfully!",
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
  usersController,
  userController,
  userUpdateController,
  userDeleteController,
};
