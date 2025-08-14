const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  getAllUsers,
  listbyid,
  remove,
  update,
} = require("../Controllers/Manageuser");
router.get("/users", getAllUsers);
router.get("/users/:users_id", listbyid);
router.delete("/users/:user_id", remove);
router.patch("/users/:user_id", upload.single("user_img"), update);
module.exports = router;
