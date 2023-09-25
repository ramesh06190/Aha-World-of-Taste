const config = require("../config");
const User = require("../model/user");
const bookidgen = require("bookidgen");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { fullName, email, password, address, mobile, otp } = req.body;
  if (!fullName || !email || !password || !address || !mobile || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory." });
  }
  try {
    // Verify the OTP
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
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const updateCart = async (req, res) => {
  const { userId, cart } = req.body;
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
      data: updatedUser,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message, status: false });
  }
};
// async function sendInitialOtp(email, token) {
//   const body = {
//     from: "dgpadmin@naveenrio.me",
//     to: email,
//     subject: `OTP verification`,
//     html: `<div>OTP verification for your email ${token}. This will expire in an hour</div>`,
//   };

//   const transport = nodemailer.createTransport({
//     host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
//     port: 587,
//     auth: {
//       user: "api", //86207576053cfe",
//       pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
//     },
//   });

//   await transport.sendMail(body, (err) => {
//     if (err) {
//       return console.log("error occurs", err);
//     } else {
//       return console.log("email sent");
//     }
//   });
// }

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
      // sendInitialOtp(email, resetToken);
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
      // sendInitialOtp(email, resetToken);
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

module.exports = {
  signUp,
  login,
  updateCart,
  sendOtp,
};
