const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.create = async (req, res) => {
  const issues_categories_name = req.body.issues_categories_name;
  db.query(
    "insert into issues_categories (issues_categories_name) values (?)",
    [issues_categories_name],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server errror");
      } else {
        res.send(results);
      }
    },
  );
};
exports.list = async (req, res) => {
  db.query("select * from issues_categories", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server errror");
    } else {
      res.send(results);
    }
  });
};

exports.remove = async (req, res) => {
  const issues_categories_id = req.params.issues_categories_id;
  db.query(
    "delete from issues_categories where issues_categories_id = ? ",
    [issues_categories_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server errror");
      } else {
        res.send(results);
      }
    },
  );
};

exports.update = async (req, res) => {
  const issues_categories_id = req.params.issues_categories_id;
  const issues_categories_name = req.body.issues_categories_name;
  db.query(
    "update issues_categories set issues_categories_name = ? where issues_categories_id = ?  ",
    [issues_categories_name, issues_categories_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server errror");
      } else {
        res.send(results);
      }
    },
  );
};
