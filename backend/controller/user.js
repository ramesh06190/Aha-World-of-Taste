const config = require("../config");
const User = require("../model/user");
const bookidgen = require("bookidgen");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { fullName, email, password, address, mobile } = req.body;
  if (!fullName || !email || !password || !address || !mobile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }
    const user = new User({
      id: bookidgen("USER-", 14522, 199585),
      fullName,
      email,
      password,
      address,
      mobile,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are mandatory." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }
    let token = await jwt.sign(
      {
        id: user.id,
      },
      config.JWT_TOKEN_KEY
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Login successful.",
        token,
        id: user.id,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  signUp,
  login,
};
