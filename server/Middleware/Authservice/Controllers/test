const jwt = require('jsonwebtoken')
const mysql = require("mysql");
require('dotenv').config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"]
    if (!token) {
      res.status(401).send("Notoken")
    }
    const decoded = jwt.verify(token, 'jwtsecret')
    // console.log(decoded)
    req.user = decoded.user
    // console.log('requser', req.user.username)

    // res.send(req.user)
    next()
  } catch (error) {
    res.status(500).send("Token Valid")
  }


}
exports.adminCheck = async (req, res, next) => {
  try {
    // console.log('admincheck', req.user)
    db.query("SELECT username,role_id FROM tbl_users WHERE username = ? ", [req.user.username], (error, result) => {
      if (error) {
        console.log(error)
        return res.status(500).send("Database query error")
      }
      // console.log(result)
      // console.log('result', result[0].role)
      if (result[0].role_id != 1) {
        return res.status(403).send('Admin access Denied!!!')
      } else {
        next()
      }
    })
  } catch (error) {
    console.log(error)
    res.status(403).send('Admin access Denied!!!')
  }
}
//   exports.adminCheck = async (req, res, next) => {
//     try {
//       db.query("SELECT username, role FROM tbl_users WHERE username = ? ", [req.user.username], (error, result) => {
//         if (error) {
//           console.log(error);
//           return res.status(500).send("Database query error");
//         }
//
//         // ตรวจสอบว่ามีผลลัพธ์จาก query หรือไม่
//         if (!result || result.length === 0) {
//           return res.status(403).send('Admin access Denied!!!');
//         }
//
//         // ตรวจสอบบทบาทของผู้ใช้
//         if (result[0].role !== "admin") {
//           return res.status(403).send('Admin access Denied!!!');
//         }
//
//         // ถ้าผู้ใช้เป็น admin ให้ดำเนินการต่อ
//         next();
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(403).send('Admin access Denied!!!');
//     }
//   }
// }
// exports.adminCheck = async (req, res, next) => {
//   try {
//     const result = await new Promise((resolve, reject) => {
//       db.query("SELECT username, role FROM tbl_users WHERE username = ? ", [req.user.username], (error, result) => {
//         if (error) {
//           console.log(error);
//           reject(error);
//           return res.status(500).send("Database query error")
//         } else {
//           resolve(result);
//           // return result
//         }
//       });
//     });
//
//     // res.send(result[0].role)
//     if (!result || result.length == 0 || result[0].role != "admin") {
//       // return res.status(403).send('Admin access Denied!!!');
//
//       res.status(403).send('Admin access Denied!!!');
//
//     }    // ถ้าผู้ใช้เป็น admin ให้ดำเนินการต่อ
//     // else if (result[0].role = "user") {
//     //   // return res.status(403).send('Admin access Denied!!!');
//     //   console.log("userrr")
//     // }
//
//
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Database query error');
//   }
// }
