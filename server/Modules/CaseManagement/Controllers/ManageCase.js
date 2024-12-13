const mysql = require("mysql");
const moment = require("moment");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.list = async (req, res) => {
  db.query(
    "SELECT * FROM Cases c INNER JOIN Users u on c.user_id = u.users_id WHERE status_id = 1",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(results);
      }
    },
  );
};

exports.listall = async (req, res) => {
  db.query(
    "SELECT * FROM Cases c INNER JOIN Users u on c.user_id = u.users_id ",
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
    "SELECT * FROM Cases c INNER JOIN Status s on c.status_id = s.status_id  INNER JOIN Users u ON c.user_id = u.users_id WHERE c.status_id IN (2,3,4,5)",
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
    "SELECT * FROM Cases c LEFT JOIN Users u on c.technician_id = u.users_id WHERE case_id = ? ",
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
    "SELECT * FROM Cases  WHERE case_id = ? ",
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
    "SELECT u1.name AS user_name,c.case_title, c.case_id,c.user_id,c.case_detail,c.technician_id,u.name FROM Cases c inner join Users u on manager_id = users_id INNER JOIN Users u1 ON c.user_id = u1.users_id WHERE case_id = ?  ",
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
    "SELECT u1.name AS usersname,s.status_name,u.name ,c.case_title,c.case_id,c.case_detail,c.manager_id as username  FROM Cases c  inner join Users  u on c.technician_id = u.users_id  inner join Status s on c.status_id = s.status_id INNER JOIN Users u1 on c.user_id = u1.users_id  WHERE technician_id = ? AND c.status_id IN (2,5) ",
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
    "SELECT c.case_title,u2.name,s.status_name,c.created_date,c.case_id,c.case_detail,c.manager_id FROM Cases c  INNER JOIN Users u1 ON c.technician_id = u1.users_id INNER JOIN Status s ON c.status_id = s.status_id INNER JOIN Users u2 on c.manager_id = u2.users_id  WHERE c.technician_id = ? AND c.status_id IN (3,4);",
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
    "SELECT c.case_id,c.case_title,s.status_name,c.case_detail FROM Cases c  JOIN Status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id = 4",
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
  try {
    db.query(
      "SELECT c.status_id , c.case_detail,c.case_id,c.case_title,s.status_name FROM Cases c  JOIN Status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id IN (1,2,3,4,5)",
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
  } catch (error) {
    console.log(error);
  }
};

exports.create = (req, res) => {
  // console.log(req.headers)
  const { case_title, case_detail, case_device_id, user_id, status_id } =
    req.body;
  console.log(req.body);
  // const case_img = req.files.case_img

  if (!case_detail) {
    return res.status(400).send("case_detail is require");
  }
  db.query(
    "INSERT INTO Cases(case_title,case_detail,case_device_id,user_id,status_id ,created_date  ) VALUES (?,?,?,?,?,NOW())",
    [case_title, case_detail, case_device_id, user_id, status_id],
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
  db.query("DELETE FROM Cases WHERE case_id = ?", [caseID], (err, result) => {
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
    "UPDATE Cases SET case_detail = ?, case_img = ? WHERE case_id = ?",
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
  if (status_id === 5) {
    db.query(
      "UPDATE Cases SET status_id = ? WHERE case_id = ? ",
      [status_id, case_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("server error ");
        } else {
          res.send(result);
        }
      },
    );
  }

  if (status_id === 4) {
    db.query(
      "UPDATE Cases SET status_id = ?, closed_date = NOW() WHERE case_id = ?",
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
      "UPDATE Cases SET status_id = ?, assigned_date = NOW() WHERE case_id = ? ",
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
      "UPDATE Cases SET status_id = ?, created_date = NOW() WHERE case_id = ? ",
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
  } else if (status_id === 3) {
    db.query(
      "UPDATE Cases SET status_id = ?, completed_date = NOW(), case_resolution= ? WHERE case_id = ? ",
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
      "UPDATE Cases SET status_id = ? WHERE case_id = ? ",
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

exports.checktimecase = async () => {
  db.query("SELECT * FROM Cases ", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    result.map((item) => {
      const currenttime = moment();
      const assigndate = moment(item.assigned_date);
      const diffInDays = currenttime.diff(assigndate, "days");
      if (diffInDays >= 3) {
        db.query(
          "UPDATE Cases SET status_id = 5 WHERE case_id = ? ",
          [item.case_id],
          (err, result) => {
            console.log(result);
          },
        );
      } else {
        console.log(`ยังไม่เลย${item.case_id}`);
      }
    });
  });
};
