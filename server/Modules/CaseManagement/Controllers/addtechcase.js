const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.patch = async (req, res) => {
  const case_id = req.params.case_id;
  const technician_id = req.body.technician_id;
  const manager_id = req.body.manager_id;
  const status_id = req.body.status_id;
  db.query(
    "UPDATE Cases SET technician_id = ?, manager_id=?,status_id =?,assigned_date = NOW()  WHERE case_id = ?",
    [technician_id, manager_id, status_id, case_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(result);
      }
    },
  );
};
