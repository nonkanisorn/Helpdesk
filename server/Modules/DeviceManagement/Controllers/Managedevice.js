const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.list = async (req, res) => {
  db.query("SELECT * FROM Device", (err, results) => {
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
    "INSERT INTO Device(dev_name) VALUES(?)",
    [dev_name],
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
  const dev_id = req.params.dev_id;
  //   console.log(dev_id);
  db.query("DELETE FROM Device WHERE dev_id = ? ", [dev_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(result);
    }
  });
};

exports.update = async (req, res) => {
  const newName = req.params.newName;
  const dev_id = req.params.dev_id;

  //   console.log(dev_id);
  db.query(
    "UPDATE Device SET dev_name = ? WHERE dev_id = ? ",
    [newName, dev_id],
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
exports.listhistorydevice = async (req, res) => {
  const dev_id = req.params.dev_id;
  db.query(
    "SELECT * FROM Cases WHERE case_device_id = ? ",
    [dev_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("no case_device_id");
      } else {
        res.send(result);
      }
    },
  );
};
exports.listcategoriesdevice = async (_, res) => {
  db.query("SELECT * FROM Categoriesdevice", (err, result) => {
    if (err) {
      res.status(500).send("error query categoriesdevice");
    } else {
      res.send(result);
    }
  });
};
