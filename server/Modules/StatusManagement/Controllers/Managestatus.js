const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.list = async (req, res) => {
  db.query("SELECT * FROM Status ", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};

exports.create = async (req, res) => {
  const status_name = req.body.status_name;
  db.query(
    "INSERT INTO Status(status_name) VALUES(?)",
    [status_name],
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
  const status_id = req.params.status_id;
  db.query(
    "DELETE FROM Status WHERE status_id = ? ",
    [status_id],
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
  const status_id = req.params.status_id;
  const status_name = req.params.status_name;
  db.query(
    "UPDATE Status SET status_name = ? WHERE status_id =? ",
    [status_name, status_id],
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
exports.statusupdate = async (req, res) => {
  const status_id = req.body.status_id;
  const case_id = req.params.case_id;
  db.query(
    "UPDATE Cases SET status_id = ? WHERE case_id = ? ",
    [status_id, case_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("error update status");
      } else {
        res.send(result);
      }
    },
  );
};
exports.getStatusById = async (req, res) => {
  const user_id = req.params.user_id;
};
