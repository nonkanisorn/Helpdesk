//ลบได้ไม่ได้ใช้
const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.getCategoriesDevice = async (_, res) => {
  db.query("SELECT * FROM issues_categories", (err, result) => {
    if (err) {
      res.status(500).send("error query categoriesdevice");
    } else {
      res.send(result);
    }
  });
};
