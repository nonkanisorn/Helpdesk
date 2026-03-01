const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.list = async (req, res) => {
  db.query(
    // "SELECT dev_id,dev_name,d2.devicetype_name  from Devices d join Devicetype d2 ON d.dev_type =d2.devicetype_id "
    "select d.dev_id,d.dev_name,d2.devicetype_name ,count(di.device_id) as numberofinstancedevice from Devices d join Devicetype d2 on d.dev_type = d2.devicetype_id left join DeviceInstances di on d.dev_id = di.device_id group by dev_name order by dev_id",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server errror");
      } else {
        res.send(results);
      }
    },
  );
};

exports.create = async (req, res) => {
  const dev_name = req.body.dev_name;
  const dev_type = req.body.dev_type;
  const dev_detail = req.body.dev_detail;
  //   console.log(dev_name);
  db.query(
    "INSERT INTO Devices(dev_name,dev_type,dev_detail) VALUES(?,?,?)",
    [dev_name, dev_type, dev_detail],
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
    "SELECT * FROM tickets WHERE ticket_device_id = ? ",
    [dev_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("no ticket_device_id");
      } else {
        res.send(result);
      }
    },
  );
};
exports.listcategoriesdevice = async (_, res) => {
  db.query("SELECT * FROM issues_categories", (err, result) => {
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
//     "SELECT c.ticket_id ,c.ticket_device_id,h.event_type ,c.ticket_resolution, h.occurred_at ,h.status_from ,h.status_to,h.actor_id,u.name   from Historyrepair h JOIN tickets c ON h.ticket_id  = c.ticket_id JOIN Users u ON h.actor_id = u.users_id  where c.ticket_device_id = ? ",
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
    "SELECT created_at , assigned_at , work_completed_at , closed_at  from tickets where ticket_device_id = ?",
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
