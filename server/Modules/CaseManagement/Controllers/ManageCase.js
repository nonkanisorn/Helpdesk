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
    "SELECT * FROM cases c INNER JOIN tbl_users u on c.user_id = u.users_id WHERE status_id = 1",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(reword);
      }
    },
  );
};
exports.listall = async (req, res) => {
  db.query(
    "SELECT * FROM cases c INNER JOIN tbl_users u on c.user_id = u.users_id",
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

exports.listcase = async (req, res) => {
  db.query(
    "SELECT * FROM cases c INNER JOIN tbl_status s on c.status_id = s.status_id  INNER JOIN tbl_users u ON c.user_id = u.users_id WHERE c.status_id IN (2,3,4)",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        console.log(result);
        res.send(result);
      }
    },
  );
};

exports.listbycaseid = async (req, res) => {
  const case_id = req.params.case_id;
  db.query(
    "SELECT * FROM cases c LEFT JOIN tbl_users u on c.technician_id = u.users_id WHERE case_id = ? ",
    [case_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("query database error");
      } else {
        res.send(result);
      }
    },
  );
};

exports.listbycase = async (req, res) => {
  const case_id = req.params.case_id;
  db.query(
    "SELECT * FROM cases  WHERE case_id = ? ",
    [case_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("query database error");
      } else {
        res.send(result);
      }
    },
  );
};
exports.listbyID = async (req, res) => {
  const case_id = req.params.case_id;
  db.query(
    "SELECT u1.name AS user_name,c.case_title, c.case_id,c.user_id,c.case_detail,c.technician_id,u.name FROM cases c inner join tbl_users u on manager_id = users_id INNER JOIN tbl_users u1 ON c.user_id = u1.users_id WHERE case_id = ?  ",
    [case_id],
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

exports.listbyidtech = async (req, res) => {
  const technician_id = req.params.technician_id;
  db.query(
    "SELECT u1.name AS usersname,s.status_name,u.name ,c.case_title,c.case_id,c.case_detail,c.manager_id as username  FROM cases c  inner join tbl_users  u on c.technician_id = u.users_id  inner join tbl_status s on c.status_id = s.status_id INNER JOIN tbl_users u1 on c.user_id = u1.users_id  WHERE technician_id = ? AND c.status_id = 2; ",
    [technician_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("query database error");
      } else {
        res.send(result);
      }
    },
  );
};

exports.listbyidtechstatus3 = async (req, res) => {
  const technician_id = req.params.technician_id;
  db.query(
    "SELECT c.case_title,u2.name,s.status_name,c.created_date,c.case_id,c.case_detail,c.manager_id FROM cases c  INNER JOIN tbl_users u1 ON c.technician_id = u1.users_id INNER JOIN tbl_status s ON c.status_id = s.status_id INNER JOIN tbl_users u2 on c.manager_id = u2.users_id  WHERE c.technician_id = ? AND c.status_id = 3;",
    [technician_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("query database error");
      } else {
        res.send(result);
      }
    },
  );
};
exports.listbyIduser = async (req, res) => {
  const user_id = req.params.user_id;
  db.query(
    "SELECT c.case_title,s.status_name,c.case_detail FROM cases c  JOIN tbl_status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id = 3",
    [user_id],
    (err, result) => {
      if (err) {
        res.status(500).send("query database error no user_id");
        console.log(err);
      } else {
        res.send(result);
      }
    },
  );
};
exports.listbyIduserstatuscase = async (req, res) => {
  const user_id = req.params.user_id;
  db.query(
    "SELECT c.status_id , c.case_detail,c.case_id,c.case_title,s.status_name FROM cases c  JOIN tbl_status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id IN (1,2,4)",
    [user_id],
    (err, result) => {
      if (err) {
        res.status(500).send("query database error no user_id");
        console.log(err);
      } else {
        res.send(result);
      }
    },
  );
};

exports.create = (req, res) => {
  // console.log(req.headers)
  const { case_title, case_detail, user_id, status_id } = req.body;
  // const case_img = req.files.case_img
  console.log(req.body);

  if (!case_detail) {
    return res.status(400).send("case_detail is require");
  }
  db.query(
    "INSERT INTO cases(case_title,case_detail,user_id,status_id ,created_date  ) VALUES (?,?,?,?,NOW())",
    [case_title, case_detail, user_id, status_id],
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
  const caseID = req.params.case_id;
  db.query("DELETE FROM cases WHERE case_id = ?", [caseID], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(result);
    }
  });
};

exports.update = async (req, res) => {
  const caseID = req.params.case_id;
  const { case_detail, case_img } = req.body;
  db.query(
    "UPDATE cases SET case_detail = ?, case_img = ? WHERE case_id = ?",
    [case_detail, case_img, caseID],
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

exports.casestatusupdate = async (req, res) => {
  const status_id = req.body.status_id;
  const case_id = req.params.case_id;
  const case_resolution = req.body.case_resolution;
  if (status_id === 3) {
    db.query(
      "UPDATE cases SET status_id = ?, closed_date = NOW() WHERE case_id = ?",
      [status_id, case_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("server error no status 3");
        } else {
          res.send(result);
        }
      },
    );
  } else if (status_id === 2) {
    console.log("status", status_id);
    db.query(
      "UPDATE cases SET status_id = ?, assigned_date = NOW() WHERE case_id = ? ",
      [status_id, case_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("error update status");
        } else {
          res.send(result);
        }
      },
    );
  } else if (status_id === 1) {
    db.query(
      "UPDATE cases SET status_id = ?, created_date = NOW() WHERE case_id = ? ",
      [status_id, case_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("error update status");
        } else {
          res.send(result);
        }
      },
    );
  } else if (status_id === 4) {
    db.query(
      "UPDATE cases SET status_id = ?, completed_date = NOW(), case_resolution= ? WHERE case_id = ? ",
      [status_id, case_resolution, case_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("error update status");
        } else {
          res.send(result);
        }
      },
    );
  } else {
    db.query(
      "UPDATE cases SET status_id = ? WHERE case_id = ? ",
      [status_id, case_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("error update status");
        } else {
          res.send(result);
        }
      },
    );
  }
};
