//ลบได้ไม่ได้ใช้
const express = require("express");
const router = express.Router();
const {
  getCategoriesDevice,
} = require("../Controllers/Managecategoriesdevice.js");
router.get("/issues-categories-device", getCategoriesDevice);
module.exports = router;
