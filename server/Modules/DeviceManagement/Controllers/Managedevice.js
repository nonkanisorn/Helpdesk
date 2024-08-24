const mysql = require("mysql");
require('dotenv').config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_device", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server errror");
    } else {
      res.send(results);
    }
  });
};

exports.create = async (req, res) => {
  const dev_name = req.body.dev_name;
//   console.log(dev_name);
  db.query(
    "INSERT INTO tbl_device(dev_name) VALUES(?)",
    [dev_name],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(result);
      }
    }
  );
};

exports.remove = async (req, res) => {
  const dev_id = req.params.dev_id;
//   console.log(dev_id);
  db.query(
    "DELETE FROM tbl_device WHERE dev_id = ? ",
    [dev_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(result);
      }
    }
  );
};

exports.update = async (req, res) => {
  const newName = req.params.newName;
  const dev_id = req.params.dev_id;
 
//   console.log(dev_id);
  db.query(
    "UPDATE tbl_device SET dev_name = ? WHERE dev_id = ? ",
    [newName,dev_id],
    (err, result) => {
      if (err) {    
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(result);
      }
    }
  );
};
