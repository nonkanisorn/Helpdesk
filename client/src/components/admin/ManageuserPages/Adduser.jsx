import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputLabel, Select, Typography, MenuItem } from '@mui/material';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect } from 'react';
function Adduser() {

  const [username, setusername] = useState("")
  const [userpassword, setuserpassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState([])
  const [selectRole, setSelectRole] = useState("")

  const register = () => {
    axios.post("http://localhost:5011/register", { username, userpassword, role_id: selectRole, name }).then(() => {
      console.log("เพิ่มสมาชิกสำเร็จ")
    }).catch((error) => {
      console.error("เพิ่มไม่สำเร็จ", error)
    })
  }
  const handlechangerole = (event) => {
    setSelectRole(event.target.value)
  }
  const handlechangename = (event) => {
    setName(event.target.value)
  }
  console.log(selectRole)
  useEffect(() => {
    axios.get("http://localhost:5011/role").then((res) => {
      setRole(res.data)
      console.log(res.data)


    })
  }, [])


  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant='h3'>เพิ่มสมาชิก</Typography>
      <Typography>Username</Typography>
      <TextField id="outlined-basic-username" label="username" variant="outlined" value={username} onChange={((e) => setusername(e.target.value))} />
      <Typography>Password</Typography>
      <TextField id="outlined-basic=password" label="password" type='password' variant="outlined" value={userpassword} onChange={((e) => setuserpassword(e.target.value))} /><br />
      <Typography>ชื่อผู้ใช้</Typography>
      <TextField value={name} onChange={handlechangename} />
      <Typography>Role</Typography>
      <Select labelId="demo-simple-select-label"
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
      <Button variant='outlined' onClick={register}>เพิ่มสมาชิก</Button>
    </Box>
  )
}

export default Adduser
