import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel, Select, Typography, MenuItem, Input } from "@mui/material";

import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect } from "react";
function Adduser() {
  const [username, setusername] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState([]);
  const [selectRole, setSelectRole] = useState("");
  const [fileimg, setFileimg] = useState(null);
  const register = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("userpassword", userpassword);
    formData.append("role_id", selectRole);
    formData.append("name", name);
    formData.append("user_img", fileimg);
    axios
      .post("http://localhost:5011/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("เพิ่มสมาชิกสำเร็จ");
        console.log(response);
      })
      .catch((error) => {
        console.error("เพิ่มไม่สำเร็จ", error);
      });
  };
  const handlechangerole = (event) => {
    setSelectRole(event.target.value);
  };
  const handlechangename = (event) => {
    setName(event.target.value);
  };
  const handlefile = (e) => {
    console.log(e.target.files[0]);
    setFileimg(e.target.files[0]);
  };
  console.log(selectRole);
  useEffect(() => {
    axios.get("http://localhost:5011/role").then((res) => {
      setRole(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3">เพิ่มสมาชิก</Typography>
      <Typography>Username</Typography>
      <TextField
        id="outlined-basic-username"
        label="username"
        variant="outlined"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <Typography>Password</Typography>
      <TextField
        id="outlined-basic=password"
        label="password"
        type="password"
        variant="outlined"
        value={userpassword}
        onChange={(e) => setuserpassword(e.target.value)}
      />
      <br />
      <Typography>ชื่อผู้ใช้</Typography>
      <TextField value={name} onChange={handlechangename} />
      <Typography>Role</Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="role"
        value={selectRole}
        onChange={handlechangerole}
      >
        {role.map((role) => (
          <MenuItem key={role.id} value={role.role_id}>
            {role.role_name}
          </MenuItem>
        ))}
      </Select>
      <br />
      <Typography>รูปภาพ</Typography>
      <Input type="file" onChange={handlefile}>
        test
      </Input>
      <br />
      <Button variant="outlined" onClick={register}>
        เพิ่มสมาชิก
      </Button>
    </Box>
  );
}

export default Adduser;
