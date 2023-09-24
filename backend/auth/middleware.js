const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../model/user");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.json({ message: "Authentication failed", status: false });
    } else {
      const decode = jwt.verify(token, config.JWT_TOKEN_KEY, null);
      req.data = decode;
      const user = await User.findOne({ id: req.data.id });
      if (user) {
        next();
      } else {
        res.json({
          message: "User Does not Exist",
          status: false,
        });
      }
    }
  } catch (error) {
    res.json({ message: "Authentication failed", status: false });
  }
};

module.exports = authentication;
