const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_technician", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};
exports.listbyrole = async (req, res) => {
  db.query(
    "SELECT u.users_id, u.username ,u.name,r.role_name FROM Users u JOIN Role r ON u.role_id = r.role_id WHERE r.role_name = 'Technician';",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("db query error");
      } else {
        res.send(result);
      }
    },
  );
};

exports.create = (req, res) => {
  console.log(req.body);
  // console.log(req.headers)
  const { technician_id, technician_name } = req.body;

  db.query(
    "INSERT INTO tbl_technician(technician_id, technician_name) VALUES (?,?)",
    [technician_id, technician_name],
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

exports.remove = async (req, res) => {
  const technician_id = req.params.technician_id;
  db.query(
    "DELETE FROM tbl_technician WHERE technician_id = ?",
    [technician_id],
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

exports.update = async (req, res) => {
  const technician_id = req.params.technician_id;
  const { technician_name } = req.body;
  db.query(
    "UPDATE tbl_technician SET technician_name = ? WHERE technician_id = ?",
    [technician_name, technician_id],
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
