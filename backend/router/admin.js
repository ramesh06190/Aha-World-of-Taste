const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");
// const auth = require("../auth/middleware");

router.post("/login", admin.login);
router.get("/order", admin.AllOrders);
router.post("/update/order", admin.updateOrderStatus);

module.exports = router;
