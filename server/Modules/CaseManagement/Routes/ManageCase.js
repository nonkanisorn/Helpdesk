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
  checktimecase,
  listcasebyuserid,
  getcasebycaseid,
  listbyidtechstatus2,
  getLastedCase,
  getCasesByInstanceID,
  listHistoryCaseByTechnicianID,
} = require("../Controllers/ManageCase");

router.get("/Case", list);
router.get("/caseall", listall);
router.get(
  "/cases/history-technician/:technician_id",
  listHistoryCaseByTechnicianID,
);
router.get("/casestatus", listcase);
router.get("/Case/:case_id", listbyID);
router.get("/caseid/:case_id", listbycaseid);
router.get("/caseidtest/:case_id", listbycase);
router.get("/Casetech/:technician_id", listbyidtech);
router.get("/casetechstatus2/:technician_id", listbyidtechstatus2);
router.get("/Casetechhistory/:technician_id", listbyidtechstatus3);
router.get("/caseuser/:user_id", listbyIduser);
router.get("/caseuserstatus/:user_id", listbyIduserstatuscase);
router.post("/Case", create);
router.delete("/Case/:case_id", remove);
router.put("/Case/:case_id", update);
router.patch("/Case/:user_id/:case_id", casestatusupdate);
router.get("/checktimecase", checktimecase);
router.get("/case/user/:technician_id", listcasebyuserid);
router.get("/case/detail/:case_id", getcasebycaseid);
router.get("/case/lasted/:user_id", getLastedCase);
router.get("/instance/:instance_id/cases", getCasesByInstanceID);
module.exports = router;
