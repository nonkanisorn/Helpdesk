import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
function Adminpages() {
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [device, setDevice] = useState();
  const [status, setStatus] = useState();
  const [department, setDepartment] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRoleData = await axios.get(`http://localhost:5011/role`);
        setRole(fetchRoleData.data.length);

        const fetchUserData = await axios.get(`http://localhost:5011/user`);
        setUser(fetchUserData.data.length);

        const fetchDeviceData = await axios.get(`http://localhost:5011/device`);
        setDevice(fetchDeviceData.data.length);

        const fetchStatusData = await axios.get(`http://localhost:5011/status`);
        setStatus(fetchStatusData.data.length);

        const fetchDepartmentData = await axios.get(
          `http://localhost:5011/department`,
        );
        setDepartment(fetchDepartmentData.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Typography textAlign="center" variant="h3">
        หน้าแรก
      </Typography>
      <Typography variant="h5" sx={{ mt: 5 }}>
        จำนวนทั้งหมด
      </Typography>

      <Box
        display="flex"
        justifyContent="space-around"
        mt={5}
        alignItems="center"
      >
        <Typography
          sx={{
            bgcolor: "#42A5F5",
            width: "200px",
            lineHeight: "100px",
            height: "100px",
            textAlign: "center",
            borderRadius: "10px",
            color: "white",
          }}
          variant="h6"
        >
          ผู้ใช้ {user}
        </Typography>
        <Typography
          sx={{
            bgcolor: "#66BB6A",
            width: "200px",
            lineHeight: "100px",
            height: "100px",
            textAlign: "center",
            color: "white",
            borderRadius: "10px",
          }}
          variant="h6"
        >
          แผนก {department}
        </Typography>
        <Typography
          sx={{
            bgcolor: "#FFA726",
            width: "200px",
            lineHeight: "100px",
            height: "100px",
            textAlign: "center",
            color: "white",
            borderRadius: "10px",
          }}
          variant="h6"
        >
          อุปกรณ์ {device}
        </Typography>
        <Typography
          sx={{
            bgcolor: "#FFD700",
            width: "200px",
            lineHeight: "100px",
            height: "100px",
            textAlign: "center",
            color: "white",
            borderRadius: "10px",
          }}
          variant="h6"
        >
          สถานะ {status}
        </Typography>
        <Typography
          sx={{
            bgcolor: "#AB47BC",
            width: "200px",
            lineHeight: "100px",
            height: "100px",
            textAlign: "center",
            color: "white",
            borderRadius: "10px",
          }}
          variant="h6"
        >
          บทบาท {role}
        </Typography>
      </Box>
    </>
  );
}

export default Adminpages;

