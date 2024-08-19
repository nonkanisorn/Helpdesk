const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
  listbyID,
  listbyidtech,
  listbycaseid,
  casestatusupdate,
  listbyIduser,
  listbyIduserstatuscase,
  listcase,
  listbycase,
  listbyidtechstatus3,
  listall,
} = require("../Controllers/ManageCase");
const { auth } = require("../Middleware/auth");

router.get("/Case", /* auth, */ list);
router.get("/caseall", listall);
router.get("/casestatus", listcase);
router.get("/Case/:case_id", listbyID);
router.get("/caseid/:case_id", listbycaseid);
router.get("/caseidtest/:case_id", listbycase);
router.get("/Casetech/:technician_id", listbyidtech);
router.get("/Casetechhistory/:technician_id", listbyidtechstatus3);
router.get("/caseuser/:user_id", listbyIduser);
router.get("/caseuserstatus/:user_id", listbyIduserstatuscase);
router.post("/Case", create);
router.delete("/Case/:case_id", remove);
router.put("/Case/:case_id", update);
router.patch("/Case/:case_id", casestatusupdate);

module.exports = router;
