import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Paperui from "../ui/Paperui";

function Managerpages() {
  const [casedata, setcasedata] = useState([]);
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
    axios.get(`http://localhost:5011/caseall`).then((response) => {
      setcasedata(response.data);
    });
  }, []);
  console.log("casedata4", datafilterstatuscase4());
  console.log("casedata3", datafilterstatuscase3());
  console.log("casedata2", datafilterstatuscase2());
  console.log("casedata1", datafilterstatuscase1());
  console.log("allcase", casedatalenght());
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Paperui title="จำนวนทั้งหมด" data={casedatalenght()} />
        <Paperui title="รอดำเนินการ" data={datafilterstatuscase1()} />
        <Paperui title="กำลังดำเนินการ" data={datafilterstatuscase2()} />
        <Paperui title="รอการยืนยัน" data={datafilterstatuscase3()} />
        <Paperui title="เสร็จสิน" data={datafilterstatuscase4()} />
      </Box>
    </Box>
  );
}
export default Managerpages;
