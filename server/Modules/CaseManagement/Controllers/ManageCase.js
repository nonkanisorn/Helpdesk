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
    "SELECT * FROM tickets c INNER JOIN users u on c.user_id = u.user_id WHERE status_id = 1",
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

exports.listTicketStatusOpen = async (req, res) => {
  db.query(
    "select * from tickets  t where status_id = 1 order   by t.ticket_id  desc",
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
exports.listForManager = async (req, res) => {
  db.query(
    // "SELECT * FROM tickets c INNER JOIN Users u on c.user_id = u.users_id ",
    "SELECT t.*, CASE WHEN t.work_completed_at IS NULL AND t.assigned_at IS NOT NULL AND NOW() > DATE_ADD(t.assigned_at, INTERVAL 3 DAY) THEN 1 ELSE 0 END AS is_overdue FROM tickets t;",
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
exports.listall = async (req, res) => {
  db.query(
    // "SELECT * FROM tickets c INNER JOIN Users u on c.user_id = u.users_id ",
    "SELECT t.*, CASE WHEN t.work_completed_at IS NULL AND t.assigned_at IS NOT NULL AND NOW() > DATE_ADD(t.assigned_at, INTERVAL 3 DAY) THEN 1 ELSE 0 END AS is_overdue FROM tickets t;",
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

exports.listticket = async (req, res) => {
  db.query(
    "SELECT * FROM tickets c INNER JOIN status s on c.status_id = s.status_id  INNER JOIN users u ON c.user_id = u.user_id WHERE c.status_id IN (2,3,4,5,6,7)",
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

exports.listbyticketid = async (req, res) => {
  const ticket_id = req.params.ticket_id;
  db.query(
    "SELECT * FROM tickets c LEFT JOIN users u on c.technician_id = u.user_id WHERE ticket_id = ? ",
    [ticket_id],
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

exports.listbyticket = async (req, res) => {
  const ticket_id = req.params.ticket_id;
  db.query(
    "SELECT * FROM tickets  WHERE ticket_id = ? ",
    [ticket_id],
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
exports.getticketbyticketid = async (req, res) => {
  const ticket_id = req.params.ticket_id;
  db.query(
    "select u.full_name ,u.phone,c.started_at, c.description,c.title ,c.created_at,c.assigned_at,c.work_completed_at,closed_at ,d.dep_name, c2.issues_categories_name,c.status_id   from tickets c join users u on c.user_id = u.user_id join Department d on u.department_id = d.dep_id join issues_categories c2  on c.issues_categories_id = c2.issues_categories_id   where c.ticket_id = ?",

    [ticket_id],
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
exports.listbyID = async (req, res) => {
  const ticket_id = req.params.ticket_id;
  db.query(
    "SELECT u1.full_name AS user_name,c.title, c.ticket_id,c.user_id,c.description,c.technician_id,u.full_name FROM tickets c inner join users u on manager_id = u.user_id INNER JOIN users u1 ON c.user_id = u1.user_id WHERE ticket_id = ?  ",
    [ticket_id],
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
    "SELECT u1.full_name AS usersname,s.status_id,u.full_name ,c.title,c.ticket_id,c.description,c.manager_id as username  FROM tickets c  inner join users  u on c.technician_id = u.user_id  inner join status s on c.status_id = s.status_id INNER JOIN users u1 on c.user_id = u1.user_id  WHERE technician_id = 8 AND c.status_id IN (2,4,5) order by c.ticket_id desc ",
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
exports.listbyidtechstatus2 = async (req, res) => {
  const technician_id = req.params.technician_id;
  db.query(
    // "SELECT u1.name AS usersname,s.status_name,u.name ,c.title,c.ticket_id,c.description,c.manager_id as username,c.created_at  FROM tickets c  inner join Users  u on c.technician_id = u.users_id  inner join Status s on c.status_id = s.status_id INNER JOIN Users u1 on c.user_id = u1.users_id  WHERE technician_id = ? AND c.status_id IN (2) ",

    "SELECT u1.full_name AS usersname,s.status_name,s.status_id,u.full_name ,c.title,c.ticket_id,c.description,c.manager_id as username,c.created_at  FROM tickets c  inner join users  u on c.technician_id = u.user_id  inner join status s on c.status_id = s.status_id INNER JOIN users u1 on c.user_id = u1.user_id  WHERE technician_id = ? AND c.status_id IN (2) ",
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
    "SELECT c.title,u2.name,s.status_name,c.created_at,c.ticket_id,c.description,c.manager_id FROM tickets c  INNER JOIN users u1 ON c.technician_id = u1.user_id INNER JOIN status s ON c.status_id = s.status_id INNER JOIN users u2 on c.manager_id = u2.user_id  WHERE c.technician_id = ? AND c.status_id IN (3,4);",
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
    "SELECT c.created_at , c.ticket_id,c.title,s.status_name,c.description,s.status_id FROM tickets c  JOIN status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id IN (1,2,3,4,5,6) order by c.ticket_id desc",
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
exports.listbyIduserstatusticket = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    db.query(
      "SELECT  c.status_id , c.description,c.ticket_id,c.title,c.created_at,s.status_name FROM tickets c  JOIN status s on c.status_id = s.status_id WHERE user_id = ? AND s.status_id IN (1,2,3,4,5,6)",
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
  const { title, description, user_id, status_id, issues_categories_id } =
    req.body;
  console.log(req.body);

  if (!description) {
    return res.status(400).send("description is require");
  }
  db.query(
    "INSERT INTO tickets(title,description,user_id,status_id ,created_at,issues_categories_id  ) VALUES (?,?,?,?,NOW(),?)",
    [title, description, user_id, status_id, issues_categories_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("server error");
      } else {
        res.send(result);
        // db.query(
        //   "insert into Historyrepair (ticket_id,device_id,actor_id,status_from,status_to,event_type) values (?,?,?,?,?,?)",
        //   [result.insertId, ticket_device_id, user_id, null, 1, "created"],
        // );
      }
    },
  );
};

exports.remove = async (req, res) => {
  const ticketID = req.params.ticket_id;
  db.query(
    "DELETE FROM tickets WHERE ticket_id = ?",
    [ticketID],
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

// exports.update = async (req, res) => {
//   const ticketID = req.params.ticket_id;
//   const { description, ticket_img } = req.body;
//   db.query(
//     "UPDATE tickets SET description = ?, ticket_img = ? WHERE ticket_id = ?",
//     [description, ticket_img, ticketID],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("server error");
//       } else {
//         res.send(result);
//       }
//     },
//   );
// };

exports.ticketstatusupdate = async (req, res) => {
  const status_id = req.body.status_id;
  const user_id = req.params.user_id;
  const ticket_id = req.params.ticket_id;
  const ticket_resolution = req.body.ticket_resolution;
  const ticket_device_id = req.body.ticket_device_id;
  const event_type = {
    1: "created",
    2: "assigned",
    3: "technician_complete",
    4: "waiting for part",
    5: "overdue for repair",
    6: "user_confirmed",
  };

  const selectOldStatusSql = () => {
    db.query(
      "select status_id as old_status_id from tickets where ticket_id = ? ",
      [ticket_id],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          const old_status_id = result[0].old_status_id;
          console.log(old_status_id);
          switch (status_id) {
            //Open
            case 1:
              db.query(
                "UPDATE tickets SET status_id = ?, created_at = NOW() WHERE ticket_id = ? ",
                [status_id, ticket_id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("error update status");
                  } else {
                    res.send(result);
                  }
                },
              );
              break;
            //Assigned
            case 2:
              db.query(
                "UPDATE tickets SET status_id = ?, assigned_at = NOW() WHERE ticket_id = ? ",
                [status_id, ticket_id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("error update status");
                  } else {
                    res.status(200).send(result);
                  }
                },
              );
              break;
            //Technician Completed
            case 3:
              db.query(
                "UPDATE tickets SET status_id = ? , started_at = NOW() WHERE ticket_id =? ",
                [status_id, ticket_id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("error update status");
                  } else {
                    res.status(200).send(result);
                  }
                },
              );
              break;
            case 4:
              const { serial_number, ticket_resolution } = req.body || {};

              const trimmedSerial =
                typeof serial_number === "string" ? serial_number.trim() : null;

              // ✅ ถ้าติ๊ก "ไม่ระบุรหัสอุปกรณ์" -> serial_number จะเป็น null (หรือส่งว่างมา)
              // ให้ update ได้เลย โดย instance_id = NULL
              if (!trimmedSerial) {
                db.query(
                  `update tickets
       set status_id = ?, instance_id = NULL, ticket_resolution = ?, work_completed_at = NOW()
       where ticket_id = ?`,
                  [status_id, ticket_resolution, ticket_id],
                  (error, result) => {
                    if (error) return res.status(500).send(error);
                    return res.status(200).send(result);
                  },
                );
                break;
              }

              // ✅ ถ้ามี serial_number จริง -> ค่อยไปหา instance_id
              db.query(
                "select instance_id from DeviceInstances where serial_number = ?",
                [trimmedSerial],
                (error, result) => {
                  if (error) return res.status(500).send(error);
                  if (result.length === 0) {
                    return res.status(404).send("not found serial_number");
                  }

                  const instance_id = result[0].instance_id;

                  db.query(
                    `update tickets
         set status_id = ?, instance_id = ?, ticket_resolution = ?, work_completed_at = NOW()
         where ticket_id = ?`,
                    [status_id, instance_id, ticket_resolution, ticket_id],
                    (error, result) => {
                      if (error) return res.status(500).send(error);
                      return res.status(200).send(result);
                    },
                  );
                },
              );
              // const { serial_number } = req.body || "";
              // console.log(status_id);
              // db.query(
              //   "select * from DeviceInstances where serial_number = ? ",
              //   [serial_number],
              //   (error, result) => {
              //     if (error) {
              //       return res.status(500).send(error);
              //     }
              //     if (result.length === 0) {
              //       return res.status(500).send("not found serial_number");
              //     }
              //
              //     const instance_id = result[0].instance_id;
              //     db.query(
              //       "update tickets set  status_id = ? , instance_id = ?, ticket_resolution = ?,  work_completed_at = NOW()  where ticket_id = ? ",
              //       [status_id, instance_id, ticket_resolution, ticket_id],
              //       (error, result) => {
              //         if (error) {
              //           console.log(error);
              //           res.status(500).send(error);
              //         } else {
              //           res.status(200).send(result);
              //         }
              //       },
              //     );
              //   },
              // );
              break;
            case 5:
              db.query(
                "update tickets set status_id = ?, closed_at = now() where ticket_id = ? ",
                [status_id, ticket_id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                  } else {
                    return res.status(200).send(result);
                  }
                },
              );

              break;
            case 6:
              db.query(
                "update tickets set status_id = ? where ticket_id = ? ",
                [status_id, ticket_id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                  } else {
                    return res.status(200).send(result);
                  }
                },
              );

              break;
          }
          // const insertHistorySql =
          //   "insert into historyrepair (ticket_id,device_id,actor_id,status_from,status_to,event_type) values (?,?,?,?,?,?)";
          // const insertParams = [
          //   ticket_id,
          //   null,
          //   user_id,
          //   null,
          //   status_id,
          //   event_type[1],
          // ];
          // db.query(insertHistorySql, insertParams, (err) => {
          //   if (err) {
          //     console.log("insert error");
          //   }
          // });
        }
      },
    );
  };
  selectOldStatusSql();
  // switch (status_id) {
  //   ticket 1:
  //     db.query(
  //       "UPDATE tickets SET status_id = ?, created_at = NOW() WHERE ticket_id = ? ",
  //       [status_id, ticket_id],
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("error update status");
  //         } else {
  //           res.send(result);
  //         }
  //       },
  //     );
  //     break;
  //   ticket 2:
  //     db.query(
  //       "UPDATE tickets SET status_id = ?, assigned_at = NOW() WHERE ticket_id = ? ",
  //       [status_id, ticket_id],
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("error update status");
  //         } else {
  //           res.send(result);
  //         }
  //       },
  //     );
  //     break;
  //   ticket 3:
  //     db.query(
  //       "UPDATE tickets SET status_id = ?,ticket_device_id = ?, work_completed_at = NOW(), ticket_resolution= ? WHERE ticket_id = ? ",
  //       [status_id, ticket_device_id, ticket_resolution, ticket_id],
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("error update status");
  //         } else {
  //           res.send(result);
  //         }
  //       },
  //     );
  //     db.query(
  //       "insert into historyrepair (ticket_id,device_id,actor_id,status_from,status_to,event_type) values (?,?,?,?,?,?)",
  //       [
  //         ticket_id,
  //         ticket_device_id,
  //         user_id,
  //         old_status_id,
  //         status_id,
  //         event_type[3],
  //       ],
  //     );
  //
  //     break;
  //   ticket 4:
  //     db.query(
  //       "UPDATE tickets SET status_id = ?, closed_at = NOW() WHERE ticket_id = ?",
  //       [status_id, ticket_id],
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("server error no status 3");
  //         } else {
  //           res.send(result);
  //         }
  //       },
  //     );
  //
  //     break;
  //   ticket 5:
  //     db.query(
  //       "UPDATE tickets SET status_id = ? WHERE ticket_id = ? ",
  //       [status_id, ticket_id],
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("server error ");
  //         } else {
  //           res.send(result);
  //         }
  //       },
  //     );
  //
  //     break;
  //   ticket 6:
  //     db.query(
  //       "update tickets set status_id = ?, closed_at = now() where ticket_id = ? ",
  //       [status_id, ticket_id],
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           return res.status(500).send(err);
  //         } else {
  //           return res.send(result);
  //         }
  //       },
  //     );
  //
  //     break;
  // }
  // const insertHistorySql =
  //   "insert into historyrepair (ticket_id,device_id,actor_id,status_from,status_to,event_type) values (?,?,?,?,?,?)";
  // const insertParams = [ticket_id, null, user_id, null, status_id, event_type[1]];
  // db.query(insertHistorySql, insertParams, (err) => {
  //   if (err) {
  //     console.log("insert error");
  //   }
  // });
  // if (status_id === 6) {
  //   db.query(
  //     "update tickets set status_id = ?, closed_at = now() where ticket_id = ? ",
  //     [status_id, ticket_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).send(err);
  //       } else {
  //         return res.send(result);
  //       }
  //     },
  //   );
  // }
  // if (status_id === 5) {
  //   db.query(
  //     "UPDATE tickets SET status_id = ? WHERE ticket_id = ? ",
  //     [status_id, ticket_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send("server error ");
  //       } else {
  //         res.send(result);
  //       }
  //     },
  //   );
  // }
  //
  // if (status_id === 4) {
  //   db.query(
  //     "UPDATE tickets SET status_id = ?, closed_at = NOW() WHERE ticket_id = ?",
  //     [status_id, ticket_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send("server error no status 3");
  //       } else {
  //         res.send(result);
  //       }
  //     },
  //   );
  // } else if (status_id === 2) {
  //   console.log("status", status_id);
  //   db.query(
  //     "UPDATE tickets SET status_id = ?, assigned_at = NOW() WHERE ticket_id = ? ",
  //     [status_id, ticket_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send("error update status");
  //       } else {
  //         res.send(result);
  //       }
  //     },
  //   );
  // } else if (status_id === 1) {
  //   db.query(
  //     "UPDATE tickets SET status_id = ?, created_at = NOW() WHERE ticket_id = ? ",
  //     [status_id, ticket_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send("error update status");
  //       } else {
  //         res.send(result);
  //       }
  //     },
  //   );
  // } else if (status_id === 3) {
  //   db.query(
  //     "UPDATE tickets SET status_id = ?,ticket_device_id = ?, completed_date = NOW(), ticket_resolution= ? WHERE ticket_id = ? ",
  //     [status_id, ticket_device_id, ticket_resolution, ticket_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send("error update status");
  //       } else {
  //         res.send(result);
  //       }
  //     },
  //   );
  // } else {
  //   db.query(
  //     "UPDATE tickets SET status_id = ? WHERE ticket_id = ? ",
  //     [status_id, ticket_id],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send("error update status");
  //       } else {
  //         res.send(result);
  //       }
  //     },
  //   );
  // }
};

exports.checktimeticket = async () => {
  db.query("SELECT * FROM tickets ", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    result.map((item) => {
      const currenttime = moment();
      const started_at = moment(item.started_at);
      const diffInDays = currenttime.diff(started_at, "days");
      if (diffInDays >= 3 && item.status_id === 3) {
        db.query(
          "UPDATE tickets SET status_id = 5 WHERE ticket_id = ? ",
          [item.ticket_id],
          (err, result) => {
            console.log(`เลยแล้ว ${item.ticket_id}`);
          },
        );
      } else {
        console.log(`ยังไม่เลย${item.ticket_id}`);
      }
    });
  });
};
exports.listticketbyuserid = async (req, res) => {
  const technician_id = req.params.technician_id;
  console.log("user_id", technician_id);
  db.query(
    "SELECT t.*, CASE WHEN t.work_completed_at IS NULL AND t.assigned_at IS NOT NULL AND NOW() > DATE_ADD(t.assigned_at, INTERVAL 3 DAY) THEN 1 ELSE 0 END AS is_overdue FROM tickets  t WHERE t.technician_id = ? ;",
    [technician_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("error query ticketbyid");
      } else {
        res.send(result);
      }
    },
  );
};
exports.getLastedticket = async (req, res) => {
  const limit = req.body.limit || 2;
  const user_id = req.params.user_id;

  db.query(
    `select * from tickets c  where c.user_id = ? ORDER BY c.ticket_id desc limit ?`,
    [user_id, limit],
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
exports.getticketsByInstanceID = async (req, res) => {
  const instance_id = req.params.instance_id;
  db.query(
    "select * from tickets where instance_id = ? ",
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

exports.listHistoryticketByTechnicianID = async (req, res) => {
  const technician_id = req.params.technician_id;
  db.query(
    "select ticket_id, u.user_id, technician_id, manager_id, status_id, issues_categories_id, instance_id, title, description, ticket_resolution, created_at, assigned_at, work_completed_at, closed_at from tickets c join users u on c.technician_id = u.user_id where c.technician_id = ?",
    [technician_id],
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
exports.autoUpdateStatus = async (req, res) => {
  db.query("select * from tickets ", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    results.map((item) => {
      const currenttime = moment();
      const work_completed_at = moment(item.work_completed_at);
      const diffInDays = currenttime.diff(work_completed_at, "days");
      if (diffInDays >= 3 && item.status_id === 4) {
        db.query(
          "UPDATE tickets SET status_id = 5 WHERE ticket_id = ? ",
          [item.ticket_id],
          (err, result) => {
            console.log(`เลยแล้ว ${item.ticket_id}`);
          },
        );
      } else {
        console.log(`ยังไม่เลย${item.ticket_id}`);
      }
    });
  });
};
