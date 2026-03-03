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
exports.listPerformanceTechnician = async (req, res) => {
  db.query(
    "SELECT u.user_id AS technician_id, u.full_name AS technician_name,   COUNT(c.ticket_id) AS assigned_count, SUM(CASE WHEN c.status_id = 6 THEN 1 ELSE 0 END) AS completed_count FROM users u LEFT JOIN tickets c  ON c.technician_id = u.user_id WHERE u.role_id = 3 GROUP BY u.user_id, u.full_name ORDER BY u.full_name;",

    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        console.log("reusltjana", results);
        res.send(results);
      }
    },
  );
};
exports.isActiveUsers = async (req, res) => {
  const { users_id } = req.params;
  const { is_active } = req.body;
  db.query(
    "Update users SET is_active = ? WHERE user_id = ? ",
    [is_active, users_id],
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
exports.getAllUsers = async (req, res) => {
  db.query(
    "SELECT * FROM users u INNER JOIN Role r ON u.role_id = r.role_id",
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
  const user_id = req.params.users_id;
  db.query(
    "SELECT * FROM users u INNER JOIN Role r ON u.role_id = r.role_id LEFT JOIN Department d on u.department_id =  d.dep_id WHERE user_id = ? ",
    [user_id],
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
  const user_id = req.params.user_id;
  //
  // console.log(users_id);
  db.query("DELETE FROM users WHERE user_id = ? ", [user_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("cannot delete");
    } else {
      res.send(result);
    }
  });
};

exports.update = async (req, res) => {
  const user_id = req.params.user_id;
  const user_img = req.file ? req.file.buffer : null;
  const {
    full_name,
    role_id,
    username,
    userpassword,
    department_id,
    email,
    phone,
    is_active,
  } = req.body;
  let query = "UPDATE users SET ";
  const params = [];
  if (full_name) {
    query += "full_name = ? ,";
    params.push(full_name);
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
    query += "password_hash = ? ,";
    const userPasswordHash = await bcrypt.hash(userpassword, 10);
    params.push(userPasswordHash);
  }
  if (user_img) {
    query += "user_img = ? ,";
    params.push(user_img);
  }
  if (department_id) {
    query += "department_id = ? ,";
    params.push(department_id);
  }
  if (email) {
    query += "email = ? ,";
    params.push(email);
  }
  if (phone) {
    query += "phone = ? ,";
    params.push(phone);
  }
  if (is_active) {
    query += "is_active = ? ,";
    params.push(is_active);
  }

  query = query.slice(0, -1);

  query += "WHERE user_id = ? ";
  params.push(user_id);
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
};
