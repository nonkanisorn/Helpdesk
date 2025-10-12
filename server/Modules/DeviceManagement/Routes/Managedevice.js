const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
  listhistorydevice,
  listdevicehistory,
  listdetaildevicefromid,
} = require("../Controllers/Managedevice.js");

router.get("/device", list);
router.get("/device/:dev_id/history", listhistorydevice);
router.post("/device", create);
router.delete("/device/:dev_id", remove);
router.put("/device/:dev_id", update);
router.get("/device/history/:device_id", listdevicehistory);

module.exports = router;
