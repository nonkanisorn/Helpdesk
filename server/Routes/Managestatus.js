const express = require("express");
const router = express.Router();
const { list, create, remove, update, statusupdate } = require("../Controllers/Managestatus");

router.get("/Status", list);
router.post("/Status", create);
router.delete("/Status/:status_id", remove);
router.put('/Status/:status_id/:status_name', update)
router.patch(`/status/:case_id`, statusupdate)
module.exports = router;
