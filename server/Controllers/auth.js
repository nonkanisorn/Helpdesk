const mysql = require("mysql")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = mysql.createConnection({

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})


exports.register = async (req, res) => {
  try {
    const { username, userpassword, role_id, name } = req.body
    const passwordHash = await bcrypt.hash(userpassword, 10)  //Encrypt
    db.query("SELECT * FROM tbl_users WHERE username = ? ", [username], (error, results) => {
      if (error) {
        res.send("server error").status(500)
      }
      if (results.length > 0) {
        res.send('มีคนใช้แล้ว').status(400)
      }
      db.query("INSERT INTO tbl_users (username,userpassword,role_id,name)values(?,?,?,?)", [username, passwordHash, role_id, name]), (err, results) => {
        if (err) {
          console.log(err)
          res.status(501).send("server error")
        }
      }
      res.send('ลงทะเบียนสำเร็จ').status(200)
    })
    //check user user ว่าซ้ำไหม
    //encrypt ท่าusernameไม่ซ้ำ จะเข้ารหัสuserpassword
    //save saveข้อมูลลงdb
  } catch (err) {
    res.send('Server error').status(500)
  }
}

exports.login = async (req, res) => {
  try {
    //check user 1.เช็คusername ว่าในdatabaseไหม ท่าไม่มี 401 2 ท่ามีไปเช็ตpassword ต่อ 3 จากนั้น สร้างpayload ที่จะส่งไปหน้าบ้าน 4.สร้างtoken
    const { username, userpassword } = req.body
    db.query("SELECT * FROM tbl_users WHERE username = ? ", [username], async (error, results) => {

      if (error) {
        res.send(err).status(500)
      }

      if (results.length > 0) {

        const isMatch = await bcrypt.compare(userpassword, results[0].userpassword)
        if (!isMatch) {
          return res.status(400).send('passผิด')
        }
        console.log(isMatch)
        var payload = {
          user: {
            username: results[0].username,
            role: results[0].role_id,
            name: results[0].name,
            users_id: results[0].users_id

          }
        }
      } else {
        return res.status(400).send("user not found")
      }

      jwt.sign(payload, 'jwtsecret', { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload })
      })


    })
  } catch (err) {
    console.log((err))
    res.send('server error').status(500)
  }
}
exports.currentUser = async (req, res) => {
  try {
    console.log('currentUser', req.user)
    db.query('SELECT users_id,username,role_id,name FROM tbl_users WHERE username = ? ', [req.user.username], async (error, result) => {
      if (error) {
        res.send(error)
        return res.status(500).send('error query database')
      }
      res.send(result)
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('server error')
  }
}
