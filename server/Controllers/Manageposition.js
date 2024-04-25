const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "repairnoticedb",
});

exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_position ", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};

exports.create = async (req, res) => {
  const position_name = req.body.position_name;
  db.query(
    "INSERT INTO tbl_position(position_name) VALUES(?)",
    [position_name],
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
  const position_id = req.params.position_id;
  db.query(
    "DELETE FROM tbl_position WHERE position_id = ? ",
    [position_id],
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
  const position_id = req.params.position_id;
  const position_name = req.params.position_name;
  db.query(
    "UPDATE tbl_position SET position_name = ? WHERE position_id =? ",
    [position_name, position_id],
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
