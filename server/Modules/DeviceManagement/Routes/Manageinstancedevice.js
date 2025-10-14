const express = require("express");
const router = express.Router();
const {
  addinstancedevice,
  editinstancedevice,
  removeinstancedevice,
  listinstancedevicefromdeviceid,
} = require("../Controllers/Manageinstancedevice.js");
router.post("/device/instance", addinstancedevice);
router.patch("/device/instance/:instance_id", editinstancedevice);
router.delete("/device/instance/:instance_id", removeinstancedevice);
router.get("/device/detail/:device_id", listinstancedevicefromdeviceid);
module.exports = router;
