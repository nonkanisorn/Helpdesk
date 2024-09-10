const mysql = require("mysql");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer();
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.list = async (req, res) => {
  db.query(
    "SELECT * FROM Users u INNER JOIN Role r ON u.role_id = r.role_id",
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
exports.listbyid = async (req, res) => {
  const users_id = req.params.users_id;
  db.query(
    "SELECT * FROM Users u INNER JOIN Role r ON u.role_id = r.role_id WHERE users_id = ? ",
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

exports.remove = async (req, res) => {
  const users_id = req.params.users_id;
  console.log(users_id);
  db.query(
    "DELETE FROM Users WHERE users_id = ? ",
    [users_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("cannot delete");
      } else {
        res.send(result);
      }
    },
  );
};

exports.update = async (req, res) => {
  const users_id = req.params.users_id;
  const { name, role_id, username, userpassword } = req.body;
  const user_img = req.file ? req.file.buffer : null;
  let query = "UPDATE Users SET ";
  const params = [];
  if (name) {
    query += "name = ? ,";
    params.push(name);
  }
  if (role_id) {
    query += "role_id = ? ,";
    params.push(role_id);
  }
  if (username) {
    query += "username = ? ,";
    params.push(username);
  }
  if (userpassword) {
    query += "userpassword = ? ,";
    const userPasswordHash = await bcrypt.hash(userpassword, 10);
    params.push(userPasswordHash);
  }
  if (user_img) {
    query += "user_img = ? ,";
    params.push(user_img);
  }

  query = query.slice(0, -1);

  query += "WHERE users_id = ? ";
  params.push(users_id);
  console.log("params", params);

  console.log(query);
  db.query(query, params, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(result);
    }
  });
  // db.query(
  //   "UPDATE Users SET name = ? , user_email = ?  WHERE users_id =? ",
  //   [name, user_email, users_id],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send("server error");
  //     } else {
  //       res.send(result);
  //     }
  //   },
  // );
};
