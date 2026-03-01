const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
  listbyID,
  listbyidtech,
  listbyticketid,
  ticketstatusupdate,
  listbyIduser,
  listbyIduserstatusticket,
  listticket,
  listbyticket,
  listbyidtechstatus3,
  listall,
  checktimeticket,
  listticketbyuserid,
  getticketbyticketid,
  listbyidtechstatus2,
  getLastedticket,
  getticketsByInstanceID,
  listHistoryticketByTechnicianID,
  listTicketStatusOpen,
} = require("../Controllers/ManageCase");

router.get("/ticket", list);
router.get("/ticketall", listall);
router.get("/ticket/status/open", listTicketStatusOpen);
router.get(
  "/tickets/history-technician/:technician_id",
  listHistoryticketByTechnicianID,
);
router.get("/ticketstatus", listticket);
router.get("/ticket/:ticket_id", listbyID);
router.get("/ticketid/:ticket_id", listbyticketid);
router.get("/ticketidtest/:ticket_id", listbyticket);
router.get("/tickettech/:technician_id", listbyidtech);
router.get("/tickettechstatus2/:technician_id", listbyidtechstatus2);
router.get("/tickettechhistory/:technician_id", listbyidtechstatus3);
router.get("/ticketuser/:user_id", listbyIduser);
router.get("/ticketuserstatus/:user_id", listbyIduserstatusticket);
router.post("/ticket", create);
router.delete("/ticket/:ticket_id", remove);
// router.put("/ticket/:ticket_id", ticketstatusupdate);
router.patch("/ticket/:user_id/:ticket_id", ticketstatusupdate);
router.get("/checktimeticket", checktimeticket);
router.get("/ticket/user/:technician_id", listticketbyuserid);
router.get("/ticket/detail/:ticket_id", getticketbyticketid);
router.get("/ticket/lasted/:user_id", getLastedticket);
router.get("/instance/:instance_id/tickets", getticketsByInstanceID);
module.exports = router;
