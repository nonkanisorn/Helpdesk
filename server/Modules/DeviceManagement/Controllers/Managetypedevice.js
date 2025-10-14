const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.listtypedevice = async (req, res) => {
  db.query(
    "select devicetype_id , devicetype_name from Devicetype",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    },
  );
};
exports.createtypedevice = async (req, res) => {
  const devicetype_name = req.body.devicetype_name;
  db.query(
    "insert into Devicetype (devicetype_name) values(?)",
    [devicetype_name],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
      }
    },
  );
};
exports.removetypedevice = async (req, res) => {
  const devicetype_id = req.params.devicetype_id;
  db.query(
    "delete from Devicetype where devicetype_id = ? ",
    [devicetype_id],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
      }
    },
  );
};
// TODO: เพ่ม feature update typedevice
exports.updatetypedevice = async (req, res) => {
  const devicetype_id = req.params.devicetype_id;
  const devicetype_name = req.body.devicetype_name;
  db.query(
    "update Devicetype set devicetype_name = ? where devicetype_id = ? ",
    [devicetype_name, devicetype_id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
      }
    },
  );
};
