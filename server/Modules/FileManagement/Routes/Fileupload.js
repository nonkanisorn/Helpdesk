const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const { fileupload } = require("../Controllers/Fileupload");
router.post("/upload", upload.single("photo"), fileupload);
module.exports = router;
