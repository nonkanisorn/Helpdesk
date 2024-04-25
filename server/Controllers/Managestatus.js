const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "repairnoticedb",
});

exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_status ", (err, results) => {
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
    "INSERT INTO tbl_status(status_name) VALUES(?)",
    [status_name],
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
  const status_id = req.params.status_id;
  db.query(
    "DELETE FROM tbl_status WHERE status_id = ? ",
    [status_id],
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
  const status_id = req.params.status_id;
  const status_name = req.params.status_name;
  db.query(
    "UPDATE tbl_status SET status_name = ? WHERE status_id =? ",
    [status_name, status_id],
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
