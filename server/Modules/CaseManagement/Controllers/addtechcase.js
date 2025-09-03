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
  const case_device_id = req.body.case_device_id;
  db.query(
    "select status_id as old_status_id from Cases where case_id = ? ",
    [case_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        const old_status_id = result[0].old_status_id;
        console.log("oldsts", old_status_id);
        db.query(
          "UPDATE Cases SET technician_id = ?, manager_id=?,status_id =?,assigned_date = NOW()  WHERE case_id = ?",
          [technician_id, manager_id, status_id, case_id],
          (err1, result1) => {
            if (err1) {
              console.log(err);
              res.status(500).send("server error");
            } else {
              db.query(
                "insert into Historyrepair (case_id,device_id,actor_id,status_from,status_to,event_type) values (?,?,?,?,?,?)",
                [
                  case_id,
                  case_device_id,
                  manager_id,
                  old_status_id,
                  status_id,
                  "assigned",
                ],
                (err2, result2) => {
                  if (err2) {
                    console.log(err2);
                  } else {
                    res.send(result2);
                  }
                },
              );
            }
          },
        );
      }
    },
  );
};
