//น่าจะลบได้เพราะว่าไม่มีการใช้techniciansแล้วย้ายไป ใช้role techniciansเลย
const express = require("express");
const router = express.Router();
const {
  list,
  create,
  remove,
  update,
  getTechnicianRole,
} = require("../Controllers/Managetech");

router.get("/technicians", list);
router.post("/technicians", create);
router.get("/technicians/role", getTechnicianRole);
router.delete("/technicians/:technician_id", remove);
router.put("/technicians/:technician_id/:technician_name", update);

module.exports = router;
