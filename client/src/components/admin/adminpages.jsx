import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Paperui from "../ui/Paperui";
function Adminpages() {
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [device, setDevice] = useState();
  const [status, setStatus] = useState();
  const [department, setDepartment] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRoleData = await axios.get(`http://localhost:5011/roles`);
        setRole(fetchRoleData.data.length);

        const fetchUserData = await axios.get(`http://localhost:5011/users`);
        setUser(fetchUserData.data.length);

        const fetchDeviceData = await axios.get(`http://localhost:5011/device`);
        setDevice(fetchDeviceData.data.length);

        const fetchStatusData = await axios.get(`http://localhost:5011/status`);
        setStatus(fetchStatusData.data.length);

        const fetchDepartmentData = await axios.get(
          `http://localhost:5011/departments`,
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
      <Box
        display="flex"
        justifyContent="space-around"
        mt={5}
        alignItems="center"
        gap={2}
      >
        <Paperui title="จำนวนผู้ใช้" data={user} />
        <Paperui title="จำนวนบทบาท" data={role} />
        <Paperui title="จำนวนอุปกรณ์" data={device} />
        <Paperui title="จำนวนแผนก" data={department} />
      </Box>
    </>
  );
}

export default Adminpages;
