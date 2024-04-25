const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "repairnoticedb",
});
exports.list = async (req, res) => {
  db.query("SELECT * FROM tbl_case", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("server error");
    } else {
      res.send(results);
    }
  });
};

exports.create = (req, res) => {
  console.log(req.body);
  // console.log(req.headers)
  const { case_detail, case_img } = req.body;
  
  db.query(
    "INSERT INTO tbl_case(case_detail, case_img) VALUES (?,?)",
    [case_detail, case_img],
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

exports.update = async (req,res)=>{
    const caseID =req.params.case_id;
    const {case_detail,case_img} = req.body
    db.query("UPDATE tbl_case SET case_detail = ?, case_img = ? WHERE case_id = ?",[case_detail,case_img,caseID],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("server error");
        }else{
            res.send(result)
        }
    })
}