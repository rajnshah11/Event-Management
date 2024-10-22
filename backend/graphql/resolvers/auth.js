const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = {
  createUser: async (args) => {
    try {
      if (!isEmailValid(args.userInput.email)) {
        throw new Error("Invalid email format.");
      }

      if (args.userInput.password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User already exists.");
      }
      const user = new User({
        email: args.userInput.email,
        password: args.userInput.password,
      });

      const result = await user.save(); 
      return {
        ...result._doc,
        _id: result._id,
        password: null
      };
    } catch (error) {
      console.error("Error occurred while creating user:", error);
      throw error;
    }
  },

  // Log in a user
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist.");
      }


      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect.");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      
      return {
        userId: user._id,
        token,
        tokenExpiration: 3600
      };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
};
