import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Statuscase() {
  const [caseData, setcaseData] = useState([]);
  const user_id = useSelector((state) => state.user.users_id);
  const [reFresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const status_id = 3;
  const topagedetail = (case_id) => {
    navigate(`/user/Detailcase/${case_id}`);
  };
  const updatestatuscase = (case_id) => {
    axios
      .patch(`http://localhost:5011/case/${case_id}`, { status_id })
      .then((result) => {
        console.log(result);
        setRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseuserstatus/${user_id}`)
      .then(function (response) {
        setcaseData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [reFresh]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ลำดับ</TableCell>
            <TableCell>ชื่องาน</TableCell>
            <TableCell>รายละเอียดงาน</TableCell>
            <TableCell>สถานะ</TableCell>
            <TableCell>เพิ่มเติม</TableCell>
            <TableCell>ยืนยันการซ่อม</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {caseData.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {item.case_title}
              </TableCell>
              <TableCell>{item.case_detail}</TableCell>
              <TableCell>{item.status_name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => topagedetail(item.case_id)}
                >
                  เพิ่มเติม
                </Button>
              </TableCell>
              <TableCell>
                {item.status_id === 4 ? (
                  <Button
                    onClick={() => {
                      if (window.confirm("ยืนยันการซ่อม")) {
                        updatestatuscase(item.case_id);
                      }
                    }}
                    variant="contained"
                    color="success"
                  >
                    ยืนยันการซ่อม
                  </Button>
                ) : item.status_id !== 4 ? (
                  <Button variant="contained" color="error">
                    ยืนยันการซ่อม
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Statuscase;
