import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import axios from "axios";

import { useState } from "react";

function Addcase() {
  const [caseDetail, setCaseDetail] = useState("");
  const [caseImg, setCaseImg] = useState("");
  const [buildingName, setBuildingname] = useState("");
  const [depname, setDepname] = useState("");

  const formData = new FormData();
  formData.append("case_detail", caseDetail);
  formData.append("case_img", caseImg);

  const handlebuildingChange = (event) => {
    setBuildingname(event.target.value);
  };
  const handledepartmentChange = (event) => {
    setDepname(event.target.value);
  };
  const createcase = async (e, event) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/Case",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // ระบุ Content-Type ไปยัง server
          },
        }
      );
      setCaseDetail("");
      setCaseImg("");
      setBuildingname("");
      setDepname("");

      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        border: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <div>แจ้งซ่อม โดยคุณ</div>
      <FormControl variant="standard">
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          <FormControl variant="standard" fullWidth>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>อาคาร</span>
              <Select
                labelId="building-select-label"
                id="building-select"
                value={buildingName}
                label="อาคาร"
                onChange={handlebuildingChange}
              >
                <MenuItem value={10}>อาคาร1</MenuItem>
                <MenuItem value={20}>อาคาร2</MenuItem>
                <MenuItem value={30}>อาคาร3</MenuItem>
              </Select>
            </div>
          </FormControl>
        </div>
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          <FormControl variant="standard" fullWidth>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>แผนก : </span>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={depname}
                label="อาคาร"
                onChange={handledepartmentChange}
              >
                <MenuItem value={10}>IT</MenuItem>
                <MenuItem value={20}>การจัดการทั่วไป</MenuItem>
                <MenuItem value={30}>การตลาด</MenuItem>
                <MenuItem value={30}>การเงิน</MenuItem>
              </Select>
            </div>
          </FormControl>
        </div>
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          รายละเอียด :
          <TextField
            id="case_detail"
            type="text"
            value={caseDetail}
            onChange={(e) => setCaseDetail(e.target.value)}
            placeholder="ใส่รายละเอียด"
            sx={{ marginLeft: 2 }}
          />
        </div>
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          รูปภาพ :
          <TextField
            id="case_img"
            type="file"
            value={caseImg}
            onChange={(e) => setCaseImg(e.target.value)}
            placeholder="ใส่รูปภาพ"
            sx={{ marginLeft: 2 }}
          />
        </div>
        {/* <InputLabel htmlFor="component-simple" ></InputLabel> */}
        <Button onClick={createcase}>เพิ่มการแจ้งซ่อม</Button>
      </FormControl>
    </Box>
  );
}

export default Addcase;