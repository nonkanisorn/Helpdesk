const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
} = require("../Controllers/Managedevice.js");

router.get("/Device", list);
router.post("/Device", create);
router.delete("/Device/:dev_id", remove);
router.put("/Device/:dev_id/:newName", update);

module.exports = router;
