const config = require("../config");
const User = require("../model/user");
const bookidgen = require("bookidgen");
const jwt = require("jsonwebtoken");
const { MailtrapClient } = require("mailtrap");
const TOKEN = "debba16c341017ee9ac193dd282c1b19";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const signUp = async (req, res) => {
  const { fullName, email, password, address, mobile, otp } = req.body;
  if (!fullName || !email || !password || !address || !mobile || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory." });
  }
  try {
    const userPresent = await User.findOne({ email });
    if (userPresent.fullName) {
      return res.json({
        message: "User already exist",
        status: false,
      });
    }
    const existingUser = await User.findOneAndUpdate(
      {
        email,
        resetToken: otp,
        // resetTokenExpiration: { $gt: new Date() },
      },
      {
        $set: {
          fullName,
          password,
          address,
          mobile,
        },
      },
      { new: true } // Return the updated document
    );

    if (!existingUser) {
      return res.json({
        message: "Invalid OTP or OTP has expired",
        status: false,
      });
    }
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
    if (user.password !== password) {
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
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      id: user.id,
      name: user.fullName,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const updateCart = async (req, res) => {
  const { cart } = req.body;
  const userId = req.data.id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required", status: false });
    }
    if (!Array.isArray(cart) || cart.length === 0) {
      return res
        .status(400)
        .json({ error: "Cart should be a non-empty array", status: false });
    }
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: { cart: cart } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found", status: false });
    }
    return res.json({
      message: "Cart updated successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message, status: false });
  }
};
async function sendInitialOtp(email, token) {
  const sender = {
    email: "mailtrap@ahaworldoftaste.com",
    name: "AhaWorld",
  };
  const recipients = [
    {
      email: email,
    },
  ];

  try {
    const result = await client.send({
      from: sender,
      to: recipients,
      subject: "OTP verification",
      html: `<div>OTP verification for your email ${token}. This will expire in an hour</div>`,
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ message: "Please provide your email", status: false });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const resetToken = Math.floor(Math.random() * 900000) + 100000;
      const newUser = new User({
        id: bookidgen("USER-", 14522, 199585),
        email,
        resetToken,
        resetTokenExpiration: new Date(Date.now() + 3600000), // 1 hour from now
      });
      await newUser.save();
      sendInitialOtp(email, resetToken);
      res.json({
        message: "OTP sent to your email",
        status: true,
        resetToken: resetToken,
      });
    } else if (!existingUser.fullName) {
      const resetToken = Math.floor(Math.random() * 900000) + 100000;
      existingUser.resetToken = resetToken;
      existingUser.resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now
      await existingUser.save();
      sendInitialOtp(email, resetToken);
      res.json({
        message: "OTP sent to your email and record updated",
        status: true,
        resetToken: resetToken,
      });
    } else {
      res.json({
        message: "User already exists",
        status: false,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      message: "An error occurred while processing your request",
      status: false,
    });
  }
};
const getUserDetails = async (req, res) => {
  const userId = req.data.id;
  try {
    const user = await User.findOne({ id: userId }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.json({ message: "Please provide your email", status: false });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "User not found", status: false });
      return;
    }
    const resetToken = Math.floor(Math.random() * 900000) + 100000;
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { resetToken },
      { new: true }
    );
    if (updatedUser) {
      res.json({
        message: "Password reset token sent to your email",
        status: true,
        resetToken: resetToken,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request",
      status: false,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    if (!email || !resetToken || !newPassword) {
      res.json({ message: "Please provide all required data", status: false });
      return;
    }
    const user = await User.findOne({ email, resetToken });
    if (!user) {
      res.json({ message: "Invalid reset token", status: false });
      return;
    }
    if (user.resetTokenExpiration < new Date()) {
      res.json({ message: "Expired reset token", status: false });
      return;
    }
    const updatedUser = await User.findOneAndUpdate(
      { email, resetToken },
      { password: newPassword, resetToken: null },
      { new: true }
    );

    if (!updatedUser) {
      res.json({ message: "Unable to update password", status: false });
      return;
    }

    res.json({ message: "Password reset successful", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request",
      status: false,
    });
  }
};

async function saveMessage(userId, sender, content) {
  console.log(userId, sender, content);
  try {
    const newChatMessage = {
      sender,
      content,
    };
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $push: { chatMessages: newChatMessage } },
      { new: true } // To return the updated user
    );
    if (!updatedUser) {
      console.error("User not found");
      return;
    }
    console.log("Chat message saved for the user");
  } catch (error) {
    console.error("Error sending chat message:", error);
  }
}

const getChatMessage = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      message: "User ID is required in the request body",
      status: false,
    });
  }
  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found with the provided ID",
        status: false,
      });
    }
    res.json({
      data: user.chatMessages || [],
      message: "chat message found",
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({
      fullName: { $exists: true, $ne: "" },
    }).select("fullName id");
    if (!users) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    res.json({
      data: users,
      message: "chat message found",
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

module.exports = {
  signUp,
  login,
  updateCart,
  sendOtp,
  getUserDetails,
  forgotPassword,
  resetPassword,
  saveMessage,
  getChatMessage,
  getAllUser,
};
