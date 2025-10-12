const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.list = async (req, res) => {
  db.query("SELECT dev_id,dev_name FROM Devices", (err, results) => {
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
  const dev_type = req.body.dev_type;
  //   console.log(dev_name);
  db.query(
    "INSERT INTO Devices(dev_name,dev_type) VALUES(?,?)",
    [dev_name, dev_type],
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
  db.query("DELETE FROM Devices WHERE dev_id = ? ", [dev_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(result);
    }
  });
};

exports.update = async (req, res) => {
  const newdevicename = req.body.newdevicename;
  const dev_id = req.params.dev_id;

  //   console.log(dev_id);
  db.query(
    "UPDATE Devices SET dev_name = ? WHERE dev_id = ? ",
    [newdevicename, dev_id],
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
// exports.listdevicehistory = async (req, res) => {
//   const device_id = req.params.device_id;
//   db.query(
//     "SELECT c.case_id ,c.case_device_id,h.event_type ,c.case_resolution, h.occurred_at ,h.status_from ,h.status_to,h.actor_id,u.name   from Historyrepair h JOIN Cases c ON h.case_id  = c.case_id JOIN Users u ON h.actor_id = u.users_id  where c.case_device_id = ? ",
//     [device_id],
//     (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(result);
//       }
//     },
//   );
// };
exports.listdevicehistory = async (req, res) => {
  const device_id = req.params.device_id;
  db.query(
    "SELECT created_date , assigned_date , work_completed_date , closed_date  from Cases where case_device_id = ?",
    [device_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    },
  );
};
