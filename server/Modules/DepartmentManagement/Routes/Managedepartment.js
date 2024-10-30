const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
  listbyuserid,
} = require("../Controllers/Managedepartment");

router.get("/Department", list);
router.get("/departmentuserid/:user_id", listbyuserid);
router.post("/Department", create);
router.delete("/Department/:dep_id", remove);
router.put("/Department/:dep_id/:dep_name", update);

module.exports = router;
