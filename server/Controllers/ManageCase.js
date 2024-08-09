const mysql = require("mysql");
require('dotenv').config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_case c INNER JOIN tbl_users u on c.user_id = u.users_id WHERE status_id = 1", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};

exports.listbycaseid = async (req, res) => {
  const case_id = req.params.case_id
  db.query("SELECT * FROm tbl_case WHERE case_id = ? ", [case_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("query database error")
    } else {
      res.send(result)
    }
  })
}
exports.listbyID = async (req, res) => {
  const case_id = req.params.case_id
  db.query("SELECT  c.case_id,c.user_id,c.case_detail, c.case_img,c.technician_id,u.name FROM tbl_case c inner join tbl_users u on manager_id = users_id WHERE case_id = ?  ", [case_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("server error")
    } else {
      res.send(result)
    }
  })
}
exports.listbyidtech = async (req, res) => {
  const technician_id = req.params.technician_id
  db.query("SELECT c.case_id,c.case_detail,c.case_img,c.manager_id FROM tbl_case c  inner join tbl_users  u on technician_id = users_id WHERE technician_id = ? AND status_id = 2", [technician_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("query database error")
    } else {
      res.send(result)
    }
  })
}
exports.listbyIduser = async (req, res) => {
  const user_id = req.params.user_id
  db.query("SELECT c.case_topic,s.status_name FROM tbl_case c  JOIN tbl_status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id = 3", [user_id], (err, result) => {
    if (err) {
      res.status(500).send("query database error no user_id")
      console.log(err)
    } else {
      res.send(result)
    }
  })
}
exports.listbyIduserstatuscase = async (req, res) => {
  const user_id = req.params.user_id
  db.query("SELECT c.status_id , c.case_id,c.case_topic,s.status_name FROM tbl_case c  JOIN tbl_status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id IN (1,2,4)", [user_id], (err, result) => {
    if (err) {
      res.status(500).send("query database error no user_id")
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

exports.create = (req, res) => {
  // console.log(req.headers)
  const { case_topic, case_detail, dep_name, user_id, status_id } = req.body;
  // const case_img = req.files.case_img
  console.log(req.body)

  if (!case_detail) {
    return res.status(400).send("case_detail is require")
  }
  db.query(
    "INSERT INTO tbl_case(dep_name,case_topic,case_detail,user_id,status_id ) VALUES (?,?,?,?,?)",
    [dep_name, case_topic, case_detail, user_id, status_id],
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
  const caseID = req.params.case_id;
  db.query(
    "DELETE FROM tbl_case WHERE case_id = ?",
    [caseID],
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
  const caseID = req.params.case_id;
  const { case_detail, case_img } = req.body
  db.query("UPDATE tbl_case SET case_detail = ?, case_img = ? WHERE case_id = ?", [case_detail, case_img, caseID], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(result)
    }
  })
}

exports.casestatusupdate = async (req, res) => {
  const status_id = req.body.status_id
  const case_id = req.params.case_id
  db.query("UPDATE tbl_case SET status_id = ? WHERE case_id = ? ", [status_id, case_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("error update status")
    } else {
      res.send(result)
    }
  })
}
