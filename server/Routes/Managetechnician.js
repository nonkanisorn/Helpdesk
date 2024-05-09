const express = require("express");
const router = express.Router();
const { list, create, remove, update } = require("../Controllers/Managetech");

router.get("/technician", list);
router.post("/technician", create);
router.delete("/technician/:technician_id", remove);
router.put('/technician/:technician_id/:technician_name',update)

module.exports = router;
