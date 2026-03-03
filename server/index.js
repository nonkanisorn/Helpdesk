// const {
//   checktimeticket,
// } = require("./Modules/ticketManagement/Controllers/Manageticket");
var mysql = require("mysql");
const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const Cookies = require("universal-cookie");
const morgan = require("morgan");
const { existsSync } = require("fs");
const {
  checktimeticket,
  autoUpdateStatus,
} = require("./Modules/CaseManagement/Controllers/ManageCase");
const cookies = new Cookies();
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // แทนที่ด้วยโดเมนของ React
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept",
//   );
//   next();
// });
// app.use(
//   cors({
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//
//     optionsSuccessStatus: 205,
//   }),
// );

app.use(cors());
app.use(cookieParser());

var db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
setInterval(() => {
  // checktimeticket();
  autoUpdateStatus();
}, 86400000);
db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + db.threadId);
});
// readdirSync("./Routes").map((r) => app.use("/", require("./Routes/" + r)));
readdirSync("./Modules").forEach((module) => {
  const routesPath = `./Modules/${module}/Routes`;

  // ตรวจสอบว่ามีโฟลเดอร์ routes อยู่หรือไม่
  if (existsSync(routesPath)) {
    readdirSync(routesPath).forEach((file) => {
      if (file.endsWith(".js")) {
        const route = require(`${routesPath}/${file}`);
        app.use(`/`, route); // แยกเส้นทางตามชื่อโมดูล
      }
    });
  } else {
    console.warn(`Warning: No routes found for module ${module}`);
  }
});
readdirSync("./Middleware").forEach((module) => {
  const routesPath = `./Middleware/${module}/Routes`;

  // ตรวจสอบว่ามีโฟลเดอร์ routes อยู่หรือไม่
  if (existsSync(routesPath)) {
    readdirSync(routesPath).forEach((file) => {
      if (file.endsWith(".js")) {
        const route = require(`${routesPath}/${file}`);
        app.use(`/`, route); // แยกเส้นทางตามชื่อโมดูล
      }
    });
  } else {
    console.warn(`Warning: No routes found for Middleware ${module}`);
  }
});
app.listen(5011, () => console.log("server run port 5011"));
