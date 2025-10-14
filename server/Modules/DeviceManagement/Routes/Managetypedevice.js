const express = require("express");
const router = express.Router();
const {
  listtypedevice,
  createtypedevice,
  removetypedevice,
  updatetypedevice,
} = require("../Controllers/Managetypedevice.js");
router.get("/device/type", listtypedevice);
router.post("/device/type", createtypedevice);
router.delete(`/device/type/:devicetype_id`, removetypedevice);
router.patch(`/device/type/:devicetype_id`, updatetypedevice);
module.exports = router;
