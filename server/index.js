var mysql = require("mysql");
const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const Cookies = require("universal-cookie");
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
// app.use(
//   cors({
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//
//     optionsSuccessStatus: 205,
//   })
// );
//
app.use(cors())
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
readdirSync("./Routes").map((r) => app.use("/", require("./Routes/" + r)));

app.listen(5011, () => console.log("server run port 5011"));
