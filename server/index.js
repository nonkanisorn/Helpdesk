var mysql = require("mysql");
const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Cookies = require("universal-cookie");
const bcrypt = require("bcrypt");
const { error } = require("console");
const morgan = require('morgan')

const cookies = new Cookies();

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5174'); // แทนที่ด้วยโดเมนของ React
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,

    optionsSuccessStatus: 205,
  })
);
app.use(cookieParser());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Helpdesk",
});

db.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + db.threadId);
});

app.post("/api/register", async (req, res) => {
  const { users_username, users_password } = req.body;
  const passwordHash = await bcrypt.hash(users_password, 11);

  db.query(
    "INSERT INTO tbl_users (users_username,users_password)VALUES(?,?)",
    [users_username, passwordHash],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(501).send("server error");
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/api/login", async (req, res) => {
  const { users_username, users_password } = req.body;

  db.query(
    "SELECT u.*, r.role_name FROM tbl_users u " +
    "INNER JOIN tbl_role r ON u.role_id = r.role_id  " +
    "WHERE users_username = ? ",
    [users_username],
    async (err, result) => {
      // console.log(result);
      if (result.length === 0) {
        res.status(401).json({
          message: "Login failed (wrong username or password)",
        });
        return;
      }
      const userData = result[0];
      // console.log(userData)
      const match = await bcrypt.compare(
        users_password,
        userData.users_password
      );
      try {
        if (!match) {
          res.status(401).json({
            message: "login fail (wrong username , password)",
          });
          return false;
        }
        const userRole = userData.role_name;

        // jwt token
        const secret = "mysecret";
        const token = jwt.sign({ users_username, role: userRole }, secret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: false, maxAge: 300000, sameSite: "none", secure: true });

        res.json({
          message: "login success",
          token: token,
        });
      } catch (err) {
        console.log(err);
        res.status(501).json({
          meassge: "login fail",
          error: error.message,
        });
      }
    }
  );
});

// app.get("/api/users", async (req, res) => {
//   try {
//     const [users_username] = req.body;
//     const authHeader = req.headers["authorization"];
//     let authToken = " ";
//     if (authToken) {
//       authToken = authHeader.split(" ")[2];
//     }
//     console.log("authToken", authToken);
//     const user = jwt.verify(authToken, secret);
//     // เราจะมั่นใจว่า user มาอย่างถูกต้องแล้ว
//     // recheck จาก database
//     // const [result2] = db.query(
//     //   "SELECT * FROME tbl_users WHERE users_name = ? ",
//     //   [users_username],(err,result)=>{
//     //     try {
//     //       if (!result2[0]){
//     //         throw {meassge: 'user not found'}
//     //       }
//     //     } catch (error) {
//     //       console.error('Error:', error.message);
//     //     }
//     //   }
//     // );

//     console.log(user);
//     db.query("SELECT * FROM tbl_users", async (err, result) => {
//       res.json({
//         user: result,
//       });
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.status(403).json({
//       meassge: "Authentication fail",
//       error: error.message,
//     });
//   }
// });

app.get("/api/users", async (req, res) => {
  const secret = "mysecret";
  try {
    const authToken = req.cookies.token;
    // let authToken = ''
    // if (authHeader){
    //   authToken = authHeader.split(' ')[1]
    // }
    console.log("authToken", authToken);
    const user = jwt.verify(authToken, secret);
    const checkResult = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tbl_users WHERE users_username = ?",
        [user.users_username],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log(checkResult[0]);
    if (!checkResult[0]) {
      res.json("User not found");
      return;
      // console.log("user not found ")
    }
    db.query("SELECT * FROM tbl_users", (err, result) => {
      if (err) {
        res.status(403).json({
          meassge: "authentication fail",
          error,
        });
        return;
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

readdirSync("./Routes").map((r) => app.use("/", require("./Routes/" + r)));

app.listen(5011, () => console.log("server run port 5011"));
