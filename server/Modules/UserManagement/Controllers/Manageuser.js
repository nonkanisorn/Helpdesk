const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_users ", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};
exports.listbyid = async (req, res) => {
  const users_id = req.params.users_id;
  db.query(
    "SELECT * FROM tbl_users WHERE users_id = ? ",
    [users_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(results);
      }
    },
  );
};

exports.create = async (req, res) => {
  const { users_name, users_img } = req.body;
  db.query(
    "INSERT TO tbl_users(users_name,user_img) VALUES(?,?)",
    [users_name, users_img],
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
  const users_id = req.params.users_id;
  db.query(
    "DELETE FROM tbl_users WHERE users_id = ? ",
    [position_id],
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
  const users_id = req.params.users_id;
  const users_name = req.body.users_name;
  db.query(
    "UPDATE tbl_users SET users_name = ?, users_img = ? WHERE users_id =? ",
    [position_name, position_id],
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
