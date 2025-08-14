import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Paperui from "../ui/Paperui";

function Technicianpage() {
  const [casedata, setcasedata] = useState([]);
  const technician_id = useSelector((state) => state.user.users_id);
  console.log(technician_id);
  console.log(casedata);
  const casedatalenght = () => {
    return casedata.length;
  };
  const datafilterstatuscase4 = () => {
    return casedata.filter((data) => data.status_id === 4).length;
  };

  const datafilterstatuscase3 = () => {
    return casedata.filter((data) => data.status_id === 3).length;
  };
  const datafilterstatuscase2 = () => {
    return casedata.filter((data) => data.status_id === 2).length;
  };
  const datafilterstatuscase1 = () => {
    return casedata.filter((data) => data.status_id === 1).length;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5011/case/user/${technician_id}`)
      .then((response) => {
        setcasedata(response.data);
      });
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Paperui title="จำนวนท้งหมด" data={casedatalenght()} />
        <Paperui title="งานที่ได้รับมอบหมาย" data={datafilterstatuscase2()} />
        <Paperui title="รอการยืนยัน" data={datafilterstatuscase3()} />
        <Paperui title="เสร็จสิน" data={datafilterstatuscase4()} />
      </Box>
    </Box>
  );
}
export default Technicianpage;
