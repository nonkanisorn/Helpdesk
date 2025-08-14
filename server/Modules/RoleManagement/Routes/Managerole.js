const express = require("express");
const router = express.Router();
const {
  getRoles,
  createRoles,
  removeRoles,
  update,
} = require("../Controllers/Managerole.js");

router.get("/roles", getRoles);
router.post("/roles", createRoles);
router.delete("/roles/:role_id", removeRoles);
router.put("/roles/:role_id/:role_name", update);

module.exports = router;
