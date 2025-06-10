const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.getRoles = async (req, res) => {
  db.query("SELECT * FROM Role ", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};

exports.createRoles = async (req, res) => {
  const role_name = req.body.role_name;
  db.query(
    "INSERT INTO Role(role_name) VALUES(?)",
    [role_name],
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

exports.removeRoles = async (req, res) => {
  const role_id = req.params.role_id;
  db.query("DELETE FROM Role WHERE role_id = ? ", [role_id], (err, result) => {
    if (err) {
      res.send(err).status(500);
    } else {
      res.send(result);
    }
  });
};

exports.update = async (req, res) => {
  const role_id = req.params.role_id;
  const role_name = req.params.role_name;
  db.query(
    "UPDATE Role SET role_name = ? WHERE role_id =? ",
    [role_name, role_id],
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
