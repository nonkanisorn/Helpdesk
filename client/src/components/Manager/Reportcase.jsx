import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";


function Reportcase() {
  const [nametech, setNametech] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState({});
  const [caseData, setcaseData] = useState([]);
  const navigate = useNavigate();
  const handleChange = (event, case_id) => {
    const selectedTechnician = event.target.value; 
    setSelectedTechnicians((prevState) => ({
      ...prevState,
      [case_id]: selectedTechnician,
    }));
  };
  const sendtech = (case_id) => {
    const technician_name = selectedTechnicians[case_id];
    axios
      .patch(`http://localhost:5000/addtechcase/${case_id}`, {
        technician_name,
      })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const topagedetail = (case_id) =>{
    navigate(`/manager/detail/${case_id}`)
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/case/")
      .then(function (response) {
        setcaseData(response.data);
        console.log(caseData);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
    axios
      .get("http://localhost:5000/technician")
      .then(function (response) {
        const technicianData = response.data.map(
          (technician) => technician.technician_name
        );
        setNametech(technicianData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Case ID</TableCell>
            <TableCell>ผู้แจ้ง</TableCell>
            <TableCell>อุปกรณ์</TableCell>
            <TableCell>รายละเอียด</TableCell>
            <TableCell>รูป</TableCell>
            <TableCell>สถานะ</TableCell>
            <TableCell>Assign</TableCell>
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
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ช่าง</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTechnicians[item.case_id] || item.technician_name}
                    label="ช่าง"
                    onChange={(event) => handleChange(event, item.case_id)}
                  >
                    {Array.isArray(nametech) &&
                      nametech.map((name, index) => (
                        <MenuItem key={index} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                {/* ปุ่มส่งข้อมูล */}
                {/* <Button
                  onClick={() => sendtech(item.case_id)}
                  variant="contained"
                >
                  ดูรายละเอียด 
                </Button> */}

                <Button
                  onClick={()=> topagedetail(item.case_id)}
                  variant="contained"
                >
                  ดูรายละเอียด
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Reportcase;
