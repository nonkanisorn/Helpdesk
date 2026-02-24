const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.getInstanceDeviceAndCount = async (req, res) => {
  const device_id = req.params.device_id;
  db.query(
    "select d.dev_name,di.instance_id ,di.serial_number,(select count(*)  from DeviceInstances di2 where di2.device_id = ? ) as total_instance ,d2.dep_name from DeviceInstances di join Devices d on di.device_id  = d.dev_id left join Department d2 ON  di.dep_id = d2.dep_id  where di.device_id = ? ",
    [device_id, device_id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    },
  );
};
exports.listinstancedevicefromdeviceid = async (req, res) => {
  const device_id = req.params.device_id;
  db.query(
    // "select d.dev_name,di.instance_id ,di.serial_number,(select count(*)  from DeviceInstances di2 where di2.device_id = ? ) as total_instance,d2.dep_name  from DeviceInstances di join Devices d on di.device_id left join Department d2 ON  di.dep_id = d2.dep_id  = d.dev_id where di.device_id = ? ",
    // "select d.dev_name,di.instance_id ,di.serial_number,(select count(*)  from DeviceInstances di2 where di2.device_id = ? ) as total_instance ,d2.dep_name from DeviceInstances di join Devices d on di.device_id  = d.dev_id left join Department d2 ON  di.dep_id = d2.dep_id  where di.device_id = ? ",
    // [device_id, device_id],
    "select * from DeviceInstances di where di.device_id = ?",
    [device_id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    },
  );
};
exports.addinstancedevice = async (req, res) => {
  const device_id = req.body.device_id;
  const serial_number = req.body.serial_number;
  const dep_id = req.body.dep_id;
  db.query(
    // "insert into DeviceInstances(device_id,serial_number,device_number ) values (?,?,?)"
    `INSERT INTO DeviceInstances (device_id, serial_number, device_number, dep_id)
   SELECT ?,? , COALESCE(MAX(device_number) + 1, 1 ) , ?
   FROM DeviceInstances
   WHERE device_id = ?`,
    [device_id, serial_number, dep_id, device_id],
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

exports.editinstancedevice = async (req, res) => {
  const instance_id = req.params.instance_id;
  const serial_number = req.body.serial_number;
  const device_number = req.body.device_number;
  const dep_id = req.body.dep_id;
  let query = "update DeviceInstances set ";
  const updates = [];
  const params = [];
  if (serial_number) {
    updates.push("serial_number = ? ");
    params.push(serial_number);
  }
  if (device_number) {
    updates.push("device_number = ? ");
    params.push(device_number);
  }
  if (dep_id) {
    updates.push("dep_id = ? ");
    params.push(dep_id);
  }
  query += updates.join(", ");
  query += "where instance_id = ? ";
  params.push(instance_id);
  db.query(query, params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};
exports.removeinstancedevice = async (req, res) => {
  const instance_id = req.params.instance_id;
  db.query(
    "delete from DeviceInstances where instance_id = ?",
    [instance_id],
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
exports.getHistoryRepairInstanceDeviceById = async (req, res) => {
  const { instance_id } = req.params;
  try {
    db.query(
      // "select * from DeviceInstances di join Cases c on c.instance_id = di.instance_id join Devices d on d.dev_id = di.device_id where di.instance_id = ?",
      // "select * from DeviceInstances di join Cases c on c.instance_id = di.instance_id join Devices d on d.dev_id = di.device_id join Devicetype dv on dv.devicetype_id = d.dev_type  where di.instance_id = ?",
      "select * from DeviceInstances di join Cases c on c.instance_id = di.instance_id join Devices d on d.dev_id = di.device_id join Devicetype dv on dv.devicetype_id = d.dev_type join Users u on u.users_id = c.technician_id join Status s on s.status_id = c.status_id where di.instance_id = ?",

      [instance_id],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          res.status(200).send(result);
        }
      },
    );
  } catch (error) {
    res.send(error);
  }
};
exports.countInstanceDevices = async (req, res) => {
  try {
    db.query(
      "SELECT d.dev_id, dev_name, COUNT(di.instance_id) AS instance_count FROM  Devices d LEFT JOIN  DeviceInstances di ON d.dev_id = di.device_id GROUP BY  d.dev_id, d.dev_name ORDER BY  instance_count DESC",
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          res.status(200).send(result);
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};
