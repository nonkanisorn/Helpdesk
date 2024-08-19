const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  register,
  login,
  currentUser,
  testimg,
} = require("../Controllers/auth");
const { adminCheck, auth } = require("../Middleware/auth");
router.post("/register", upload.single("user_img"), register);
router.post("/login", login);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, adminCheck, currentUser);
router.post("/testimg/:users_id", upload.single("user_img"), testimg);
// router.post('/auth', auth)
module.exports = router;
