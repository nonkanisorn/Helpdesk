const express = require("express");
const router = express.Router();
const { list, create, remove, update } = require("../Controllers/Manageposition");

router.get("/Position", list);
router.post("/Position", create);
router.delete("/Position/:position_id", remove);
router.put('/Position/:position_id/:position_name',update)

module.exports = router;
