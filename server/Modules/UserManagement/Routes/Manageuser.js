const express = require("express");
const router = express.Router();
const { list, listbyid } = require("../Controllers/Manageuser");
router.get("/user", list);
router.get("/userbyid/:users_id", listbyid);
module.exports = router;
