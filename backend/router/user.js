const express = require("express");
const router = express.Router();
const user = require("../controller/user");
const auth = require("../auth/middleware");

router.post("/signup", user.signUp);
router.post("/login", user.login);
router.post("/update-cart", auth, user.updateCart);
router.post("/send-top", user.sendOtp);
router.post("/user-detail", auth, user.getUserDetails);
router.post("/forgot-password", user.forgotPassword);
router.post("/reset-password", user.resetPassword);
router.post("/chat", user.getChatMessage);
router.get("/all-user", user.getAllUser);
router.post("/add/order", auth, user.order);
router.get("/my/order", auth, user.myOrder);

module.exports = router;
