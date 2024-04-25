const express = require("express");
const router = express.Router();
const { list, create, remove, update } = require("../Controllers/Managestatus");

router.get("/Status", list);
router.post("/Status", create);
router.delete("/Status/:status_id", remove);
router.put('/Status/:status_id/:status_name',update)

module.exports = router;
