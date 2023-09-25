const jwt = require("jsonwebtoken");
const config = require("../config");

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "Enter email and password", status: false });
    } else {
      if (
        email.trim() === "admin@gmail.com" &&
        password.trim() === "admin@123"
      ) {
        const token = await jwt.sign(
          {
            admin: true,
            email,
          },
          config.JWT_TOKEN_KEY
        );
        res.json({ message: "Admin can login", status: true, token });
      } else {
        res.json({ message: "Ivalid credentials", status: false });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

module.exports = {
  login,
};
