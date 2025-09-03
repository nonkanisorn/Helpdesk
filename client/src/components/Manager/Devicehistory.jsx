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
        `http://localhost:5011/device/history/${dev_id}`,
      );
      setDeviceData(response.data);
    };
    fetchdata();
  }, [dev_id]);
  console.log(deviceData);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 800, overflow: "auto" }}
      >
        <h2> ประวัติการซ่อมของอุปกรณ์</h2>{" "}
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">เลขเคส</TableCell>
              <TableCell align="center">รหัสอุปกรณ์</TableCell>
              <TableCell align="center">สเตตัสก่อนหน้า</TableCell>
              <TableCell align="center">สเตตัสใหม่</TableCell>
              <TableCell align="center">ผู้ที่กระทำ</TableCell>
              <TableCell align="center">ประเภทเหตุการณ์</TableCell>
              <TableCell align="center">ผลการซ่อม</TableCell>
              <TableCell align="center">เวลาบันทึกเหตุการณ์</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceData.length > 0 ? (
              deviceData.map((item, idx) => (
                <TableRow key={idx}>
                  {item.status_to === 3 ? (
                    <>
                      <TableCell align="center">{item.case_id}</TableCell>
                      <TableCell align="center">
                        {item.case_device_id}
                      </TableCell>
                      <TableCell align="center">{item.status_from}</TableCell>
                      <TableCell align="center">{item.status_to}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.event_type}</TableCell>
                      <TableCell align="center">
                        {item.case_resolution}
                      </TableCell>
                      <TableCell align="center">{item.occurred_at}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="center">{item.case_id}</TableCell>
                      <TableCell align="center">
                        {item.case_device_id}
                      </TableCell>
                      <TableCell align="center">{item.status_from}</TableCell>
                      <TableCell align="center">{item.status_to}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.event_type}</TableCell>
                      <TableCell align="center">-</TableCell>
                      <TableCell align="center">{item.occurred_at}</TableCell>
                    </>
                  )}
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
