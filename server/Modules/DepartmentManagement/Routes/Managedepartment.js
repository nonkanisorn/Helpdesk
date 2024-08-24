const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
} = require("../Controllers/Managedepartment");

router.get("/Department", list);
router.post("/Department", create);
router.delete("/Department/:dep_id", remove);
router.put("/Department/:dep_id/:dep_name", update);

module.exports = router;
