const express = require("express");
const router = express.Router();
const meta = require("../controller/meta");

router.post("/upload/image", meta.imageUpload);

module.exports = router;
