const mysql = require("mysql");
require('dotenv').config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.patch = async (req,res)=>{
    const caseID = req.params.case_id;
    const technician_name = req.body.technician_name
    db.query("UPDATE tbl_case SET technician_name = ? WHERE case_id = ?",[technician_name,caseID],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("server error");
        }else{
            res.send(result)
        }
    })
}