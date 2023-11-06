const jwt = require("jsonwebtoken");
const config = require("../config");
const Order = require("../model/order");

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
const AllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ data: orders, message: "All Orders", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, id } = req.body;
    if (!status || !id) {
      res.json({ message: "Enter orderId and status", status: false });
    } else {
      const updatedOrder = await Order.findOneAndUpdate(
        { id },
        { $set: { status } },
        { new: true }
      );
      if (!updatedOrder) {
        return res
          .status(404)
          .json({ message: "Order not found", status: false });
      }

      res.json({
        message: "Order status updated successfully",
        status: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

module.exports = {
  login,
  AllOrders,
  updateOrderStatus,
};
