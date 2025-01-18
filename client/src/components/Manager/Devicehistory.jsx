import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import axios from "axios";
function Devicehistory() {
  const { dev_id } = useParams();
  const [deviceData, setDeviceData] = useState([]);
  console.log("devid", dev_id);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `http://localhost:5011/historydevice/${dev_id}`,
      );
      setDeviceData(response.data);
    };
    fetchdata();
  }, [dev_id]);
  console.log(deviceData);
  return (
    <>
      <TableContainer component={Paper}>
        <h2> ประวัติการซ่อมของอุปกรณ์</h2>{" "}
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">CaseID</TableCell>
              <TableCell align="center">UserID</TableCell>
              <TableCell align="center">TechnicianID</TableCell>
              <TableCell align="center">Status_id</TableCell>
              <TableCell align="center">Createcasedate</TableCell>
              <TableCell align="center">AssigncaseDate</TableCell>
              <TableCell align="center">ClosecaseDate</TableCell>
              <TableCell align="center">CompletecaseDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceData.length > 0 ? (
              deviceData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{item.case_id}</TableCell>
                  <TableCell align="center">{item.user_id}</TableCell>
                  <TableCell align="center">{item.technician_id}</TableCell>
                  <TableCell align="center">{item.status_id}</TableCell>
                  <TableCell align="center">{item.created_date}</TableCell>
                  <TableCell align="center">{item.assigned_date}</TableCell>
                  <TableCell align="center">{item.closed_date}</TableCell>
                  <TableCell align="center">{item.completed_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <p>ไม่มีข้อมูล</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Devicehistory;
