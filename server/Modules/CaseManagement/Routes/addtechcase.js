const express = require("express");
const router = express.Router();
const { patch, addTechToTicket } = require("../Controllers/addtechcase");

router.patch("/addtechticket/:ticket_id", addTechToTicket);

module.exports = router;
