import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Input, Typography } from "@mui/material";
import axios from "axios";
function Profile() {
  const role_id = useSelector((state) => state.user.role);
  const name = useSelector((state) => state.user.name);
  const users_id = useSelector((state) => state.user.users_id);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (users_id) {
      const fetchdata = async () => {
        const response = await axios.get(
          `http://localhost:5011/userbyid/${users_id}`,
        );
        if (response.data[0].user_img.data.length === 0) {
          setUrl(
            "https://images.unsplash.com/photo-1719205153554-33eb4834cc36?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          );
        } else {
          const user = response.data[0];
          console.log(response);
          const array = new Uint8Array(user.user_img.data);
          const blob = new Blob([array], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          setUrl(url);
        }
      };

      fetchdata();
    }
  }, [users_id]);
  return role_id === 1 ? (
    <Box>
      <Box display="flex" justifyContent="center" mb={5}>
        <Typography fontSize={55}>ข้อมูลส่วนตัว</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <img
          width="200px"
          height="200px"
          src={url}
          alt="testimg"
          style={{ borderRadius: "50%" }}
        />
      </Box>

      <Typography>ชื่อผู้ใช้ : {name}</Typography>
      <Typography>ตำแหน่ง : Admin</Typography>
    </Box>
  ) : role_id === 2 ? (
    <Box>
      <Box display="flex" justifyContent="center" mb={5}>
        <Typography fontSize={55}>ข้อมูลส่วนตัว</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <img
          width="200px"
          height="200px"
          src={url}
          alt="testimg"
          style={{ borderRadius: "50%" }}
        />
      </Box>

      <Typography>ชื่อผู้ใช้ : {name}</Typography>
      <Typography>ตำแหน่ง : Manager</Typography>
    </Box>
  ) : role_id === 3 ? (
    <Box>
      <Box display="flex" justifyContent="center" mb={5}>
        <Typography fontSize={55}>ข้อมูลส่วนตัว</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <img
          width="200px"
          height="200px"
          src={url}
          alt="testimg"
          style={{ borderRadius: "50%" }}
        />
      </Box>

      <Typography>ชื่อผู้ใช้ : {name}</Typography>
      <Typography>ตำแหน่ง : Technician</Typography>
    </Box>
  ) : role_id === 4 ? (
    <Box>
      <Box display="flex" justifyContent="center" mb={5}>
        <Typography fontSize={55}>ข้อมูลส่วนตัว</Typography>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mb: 5 }}>
        <img
          width="200px"
          height="200px"
          src={url}
          alt="testimg"
          style={{ borderRadius: "50%" }}
        />
      </Box>
      <Input type="file"></Input>
      <Typography>ชื่อผู้ใช้ : {name}</Typography>
    </Box>
  ) : (
    <Typography>no role</Typography>
  );
}

export default Profile;
