const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
} = require("../Controllers/Managerole.js");

router.get("/role", list);
router.post("/role", create);
router.delete("/role/:role_id", remove);
router.put("/role/:role_id/:role_name", update);

module.exports = router;
