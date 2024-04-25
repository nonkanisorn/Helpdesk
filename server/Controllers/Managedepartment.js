const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "repairnoticedb",
});

exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_department", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};

exports.create = async (req, res) => {
  const dep_name = req.body.dep_name
  db.query(
    "INSERT INTO tbl_department(dep_name) VALUES(?)",
    [dep_name],
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
  const dep_id = req.params.dep_id;
  db.query(
    "DELETE FROM tbl_department WHERE dep_id = ? ",
    [dep_id],
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
  const dep_id = req.params.dep_id;
  const dep_name = req.params.dep_name;
  db.query(
    "UPDATE tbl_department SET dep_name = ? WHERE dep_id =? ",
    [dep_name, dep_id],
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
