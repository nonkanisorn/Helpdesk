const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.getAllDepartments = async (req, res) => {
  db.query("SELECT * FROM Department", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};
exports.getDepartmentByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  db.query(
    "SELECT * FROM Department WHERE user_id = ? ",
    [user_id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    },
  );
};

exports.createDepartment = async (req, res) => {
  const dep_name = req.body.dep_name;
  db.query(
    "INSERT INTO Department(dep_name) VALUES(?)",
    [dep_name],
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

exports.removeDepartment = async (req, res) => {
  const dep_id = req.params.dep_id;
  db.query(
    "DELETE FROM Department WHERE dep_id = ? ",
    [dep_id],
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
  const dep_id = req.params.dep_id;
  const dep_name = req.params.dep_name;
  db.query(
    "UPDATE Department SET dep_name = ? WHERE dep_id =? ",
    [dep_name, dep_id],
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
