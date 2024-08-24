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

function Historyrepair() {
  const [caseData, setcaseData] = useState([]);
  const user_id = useSelector((state) => state.user.users_id);
  console.log("user", user_id);

  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseuser/${user_id}`)
      .then(function (response) {
        setcaseData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

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
                <Button variant="contained" color="success">
                  test
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Historyrepair;
