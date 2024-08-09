import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
function Reportcasetech() {
  const navigate = useNavigate()
  const technician_id = useSelector((state) => state.user.users_id)
  const [caseData, setcaseData] = useState([]);
  const topagedetail = (case_id) => {
    navigate(`/technician/detailcasetech/${case_id}`)
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5011/Casetech/${technician_id}`)
      .then(function(response) {
        setcaseData(response.data);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() { });
  }, []);

  return (
    <Box>
      < TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>อุปกรณ์</TableCell>
              <TableCell>รายละเอียด</TableCell>
              <TableCell>รูป</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>หัวหน้า</TableCell>
              <TableCell>ว/ด/ป</TableCell>
              <TableCell>ส่งงาน</TableCell>
              <TableCell>ผลประเมิน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {caseData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.case_id}
                </TableCell>
                <TableCell>{item.case_detail}</TableCell>
                <TableCell>{item.case_detail}</TableCell>
                <TableCell>{item.case_detail}</TableCell>
                <TableCell>{item.case_detail}</TableCell>
                <TableCell>{item.case_detail}</TableCell>
                <TableCell>{item.case_detail}</TableCell>

                <TableCell>
                  <Button
                    size="small"
                    sx={{ fontSize: 7, padding: 0.5 }}
                    variant="contained"
                    onClick={() => topagedetail(item.case_id)}
                  >
                    ดูงาน
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </Box>
  );
}
export default Reportcasetech;
