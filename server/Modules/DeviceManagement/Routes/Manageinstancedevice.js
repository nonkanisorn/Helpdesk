const express = require("express");
const router = express.Router();
const {
  addinstancedevice,
  editinstancedevice,
  removeinstancedevice,
  listinstancedevicefromdeviceid,
  getHistoryRepairInstanceDeviceById,
  countInstanceDevices,
} = require("../Controllers/Manageinstancedevice.js");
router.post("/device/instance", addinstancedevice);
router.get("/device/instance/count", countInstanceDevices);
router.patch("/device/instance/:instance_id", editinstancedevice);
router.delete("/device/instance/:instance_id", removeinstancedevice);
router.get("/device/detail/:device_id", listinstancedevicefromdeviceid);
router.get(
  "/device/instance/:instance_id/history-repair",
  getHistoryRepairInstanceDeviceById,
);
module.exports = router;
