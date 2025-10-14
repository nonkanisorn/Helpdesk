import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
function Detailcasetech() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { case_id } = useParams();
  const navigate = useNavigate();
  const [caseDatabyId, setCaseDatabyId] = useState({});
  const [completesummarydata, setCompletesummarydata] = useState("");
  const user_id = useSelector((state) => state.user.users_id);
  const status_id = 3;
  const statuswait_id = 4;

  const onSubmit = (data) => console.log(data);
  // console.log(watch("case_resolution"));
  const workComplete = (data) => {
    axios
      .patch(`http://localhost:5011/case/${user_id}/${case_id}`, {
        status_id,
        serial_number: data.serial_number,
        case_resolution: data.case_resolution,
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
    axios.patch(`http://localhost:5011/Case/${user_id},${case_id}`, {
      status_id: statuswait_id,
    });
  };

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
        <form>
          <TextField
            label="รหัสอุปกรณ์"
            {...register("serial_number")}
          ></TextField>
          <TextField
            {...register("case_resolution")}
            id="outlined=multiline-static"
            label="สรุปผลการซ่อม"
            rows={10}
            multiline
            sx={{ width: "80%" }}
          />
        </form>
      </Box>
      <Button
        variant="contained"
        sx={{ ml: 2, mb: 2 }}
        color="success"
        type="submit"
        onClick={handleSubmit(workComplete)}
      >
        ยืนยันการซ่อม
      </Button>
      <Button
        variant="contained"
        sx={{ ml: 2, mb: 2 }}
        color="success"
        type="submit"
        onClick={() => waitingforpart()}
      >
        รออะไหล่
      </Button>
    </Box>
  );
}

export default Detailcasetech;
