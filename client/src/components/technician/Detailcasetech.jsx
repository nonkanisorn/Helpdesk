import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
function Detailcasetech() {
  const { case_id } = useParams();
  const navigate = useNavigate();
  const [caseDatabyId, setCaseDatabyId] = useState({});
  const [completesummarydata, setCompletesummarydata] = useState("");
  const [caseDeviceId, setCaseDeviceId] = useState();
  const user_id = useSelector((state) => state.user.users_id);
  console.log("user_id", user_id);
  console.log(case_id);
  const status_id = 3;
  const statuswait_id = 5;

  const updatestatuscase = () => {
    axios
      .patch(`http://localhost:5011/case/${user_id}/${case_id}`, {
        status_id,
        case_device_id: caseDeviceId,
        case_resolution: completesummarydata,
      })
      .then(() => navigate("/technician/reportcasetech"))
      .catch((error) => {
        if (error) {
          console.log("error", error.response.data);
          alert("กรุณาใส่รหัสอุปกรณ์ให้ถูกต้อง");
        }
      });
  };
  const waitingforpart = () => {
    axios.patch(`http://localhost:5011/Case/${case_id}`, {
      status_id,
    });
  };

  const completesummary = (e) => {
    setCompletesummarydata(e.target.value);
  };
  console.log(completesummarydata);
  console.log(caseDeviceId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5011/case/${case_id}`,
        );
        if (response.data && response.data.length > 0) {
          setCaseDatabyId(response.data[0]);
          console.log("Response data:", response.data[0]);
        } else {
          console.error("No data found for this case ID");
        }
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchData();
  }, [case_id]);
  return (
    <Box border={1}>
      <Box sx={{ mt: 2, mb: 2, ml: 2 }}>
        <Typography sx={{ mb: 2 }}>
          ชื่อเรื่อง : {caseDatabyId.case_title}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          รายละเอียดเคส {caseDatabyId.case_detail}
        </Typography>

        <Typography sx={{ mb: 2 }}>
          ชื่อผู้แจ้งการซ่อม: {caseDatabyId.user_name}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          คนที่มอบหมายงาน : {caseDatabyId.name}
        </Typography>
        <TextField
          label="รหัสอุปกรณ์"
          onChange={(e) => setCaseDeviceId(e.target.value)}
        ></TextField>
        <TextField
          id="outlined=multiline-static"
          label="สรุปผลการซ่อม"
          rows={10}
          multiline
          sx={{ width: "80%" }}
          onChange={(e) => completesummary(e)}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          if (window.confirm("ยืนยันการซ่อม")) {
            updatestatuscase();
          }
        }}
        sx={{ ml: 2, mb: 2 }}
        color="success"
      >
        ยืนยันการซ่อม
      </Button>
    </Box>
  );
}

export default Detailcasetech;
