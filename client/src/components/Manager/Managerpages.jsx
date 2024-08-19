import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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
      <Typography fontSize={70}>เคส</Typography>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            border: 1,
            borderStyle: "none",
            borderRadius: "5px",
            padding: "2px",
            width: "150px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            bgcolor: "#ADD8E6",
            mr: "10px",
          }}
        >
          จำนวนทั้งหมด : {casedatalenght()}
        </Typography>{" "}
        <Typography
          sx={{
            border: 1,
            borderStyle: "none",
            borderRadius: "5px",
            padding: "2px",
            width: "150px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            bgcolor: "#FFD580",
            mr: "10px",
          }}
        >
          รอดำเนินการ : {datafilterstatuscase1()}{" "}
        </Typography>{" "}
        <Typography
          sx={{
            border: 1,
            borderStyle: "none",
            borderRadius: "5px",
            padding: "2px",
            width: "150px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            bgcolor: "#FFFACD",
            mr: "10px",
          }}
        >
          กำลังดำเนินการ : {datafilterstatuscase2()}{" "}
        </Typography>{" "}
        <Typography
          sx={{
            border: 1,
            borderStyle: "none",
            borderRadius: "5px",
            padding: "2px",
            width: "150px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            bgcolor: "#D8BFD8",
            mr: "10px",
          }}
        >
          รอการยืนยัน : {datafilterstatuscase4()}{" "}
        </Typography>{" "}
        <Typography
          sx={{
            border: 1,
            borderStyle: "none",
            borderRadius: "5px",
            padding: "2px",
            width: "150px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            bgcolor: "#90EE90",
            mr: "10px",
          }}
        >
          เสร็จสิน : {datafilterstatuscase3()}{" "}
        </Typography>{" "}
      </Box>
    </Box>
  );
}
export default Managerpages;
