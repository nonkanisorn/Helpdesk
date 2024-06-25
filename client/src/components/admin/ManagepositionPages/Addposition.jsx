import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";

import { useState } from "react";

function Addposition() {
  const navigate = useNavigate();
  const [positionName, setPositionname] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(positionName);
  const formData = new FormData();
  formData.append("position_name", positionName);

  const createposition = async (e, event) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/Position`,
        formData,
        {
          headers: {
            "Content-Type": "application/json", // ระบุ Content-Type ไปยัง server
          },
        }
      );
      setPositionname("");
      navigate("/admin/Manageposition")
      console.log(response);
    } catch (error) {
      console.log(error);
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
      <div>
        <h1>เพิ่มตำแหน่ง</h1>
      </div>
      <FormControl variant="standard">
        <div style={{ marginLeft: 15, marginBottom: 15 }}></div>
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          ตำแหน่ง :
          <TextField
            id="dev_name"
            type="text"
            value={positionName}
            onChange={(e) => setPositionname(e.target.value)}
            placeholder="ใส่อุปกรณ์"
            sx={{ marginLeft: 2 }}
          />
        </div>
        <Button onClick={createposition}>เพิ่มตำแหน่ง</Button>
      </FormControl>
    </Box>
  );
}

export default Addposition;
