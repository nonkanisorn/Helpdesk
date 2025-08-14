const express = require("express");
const router = express.Router();
const {
  update,
  getAllDepartments,
  getDepartmentByUserId,
  createDepartment,
  removeDepartment,
} = require("../Controllers/Managedepartment");

router.get("/departments", getAllDepartments);
router.get("/departments/users/:user_id", getDepartmentByUserId);
router.post("/departments", createDepartment);
router.delete("/departments/:dep_id", removeDepartment);
router.put("/departments/:dep_id/:dep_name", update);

module.exports = router;
