import { Paper, Box, Typography, Grid, Stack, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Paperui from "../ui/Paperui";
import PaperuiV2 from "../ui/PaperuiV2";
import { amber, green, red } from "@mui/material/colors";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Link } from "react-router-dom";
function Managerpages() {
  const [casedata, setcasedata] = useState([]);
  const [technicianData, setTechnicianData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(casedata);
  const casedatalenght = () => {
    return casedata.length;
  };
  const datafilterstatuscase5 = () => {
    return casedata.filter((data) => data.status_id === 5).length;
  };
  const datafilterstatuscase4 = () => {
    return casedata.filter((data) => data.status_id === 4).length;
  };

  const datafilterstatuscase6 = () => {
    return casedata.filter((data) => data.status_id === 6).length;
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
    axios.get(`${apiUrl}/caseall`).then((response) => {
      setcasedata(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${apiUrl}/users/technician`).then((response) => {
      setTechnicianData(response.data);
    });
  }, []);
  console.log("asd", technicianData);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" fontWeight="fontWeightBold">
          Dashbaord ผู้จัดการ
        </Typography>
        <Link to={{ pathname: "/manager/reportcase" }}>
          <Button variant="contained" sx={{ borderRadius: 3 }}>
            <SignalCellularAltRoundedIcon sx={{ mr: 1, fontSize: 20 }} />{" "}
            ดูรายงานเต็ม
          </Button>
        </Link>
      </Stack>
      <Typography sx={{ marginY: 2 }} color="grey">
        ภาพรวมรายงานการซ่อมทั้งหมด
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <PaperuiV2
            title="งานทั้งหมด"
            icon={
              <ConstructionRoundedIcon
                sx={{ fontSize: 50, color: "#2463EB" }}
              />
            }
            number={casedatalenght()}
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="เสร็จสิ้น"
            icon={
              <CheckCircleOutlineRoundedIcon
                sx={{ fontSize: 50, color: green[500] }}
              />
            }
            number={datafilterstatuscase6()}
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="กําลังดําเนินการ"
            icon={
              <AccessTimeRoundedIcon sx={{ fontSize: 50, color: amber[400] }} />
            }
            number={datafilterstatuscase2()}
          />
        </Grid>
        <Grid item md={3}>
          <PaperuiV2
            title="เกินกำหนด"
            icon={
              <ErrorOutlineRoundedIcon sx={{ fontSize: 50, color: red[400] }} />
            }
            number={datafilterstatuscase5()}
          />
        </Grid>
      </Grid>
      <Paper
        sx={{
          borderRadius: 3,
          p: 5,
          mt: 5,
          pb: 25,
          maxHeight: 750,
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" fontWeight="fontWeightBold">
          สรุปผลงานช่างแต่ละคน
        </Typography>
        <Typography color="grey">
          จำนวนงงานที่ได้รับมอบหมายและงานที่เสร็จสิ้น
        </Typography>
        <Grid container>
          {technicianData.map((items, index) => (
            <Grid item xs={12} md={12}>
              <Paper sx={{ minHeight: 150, borderRadius: 3, mt: 3, p: 4 }}>
                <Typography>{items.name}</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="grey">ได้รับมอบหมาย</Typography>
                  <Typography color="grey">เสร็จสิ้น</Typography>
                  <Typography color="grey"> เกินกำหนด</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="black"></Typography>
                  <Typography color="green">0</Typography>
                  <Typography textAlign="center" color="orange">
                    0
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
export default Managerpages;
