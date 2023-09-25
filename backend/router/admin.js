const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");
// const auth = require("../auth/middleware");

router.post("/login", admin.login);

module.exports = router;
