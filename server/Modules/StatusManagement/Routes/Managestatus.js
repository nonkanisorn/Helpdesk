const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
  statusupdate,
} = require("../Controllers/Managestatus");

router.get("/status", list);
router.post("/status", create);
router.delete("/status/:status_id", remove);
router.put("/status/:status_id/:status_name", update);
router.patch(`/status/:ticket_id`, statusupdate);
module.exports = router;
