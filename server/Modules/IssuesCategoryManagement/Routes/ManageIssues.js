const express = require("express");
const { list, remove, update, create } = require("../Controllers/ManageIssues");
const router = express.Router();

router.post("/issues-categories", create);
router.get("/issues-categories", list);
router.delete(`/issues-categories/:issues_categories_id`, remove);
router.patch(`/issues-categories/:issues_categories_id`, update);
module.exports = router;
