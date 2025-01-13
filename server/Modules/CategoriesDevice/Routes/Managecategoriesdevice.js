const express = require("express");
const router = express.Router();
const {
  listcategoriesdevice,
} = require("../Controllers/Managecategoriesdevice.js");
router.get("/categoriesdevice", listcategoriesdevice);
module.exports = router;
