import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
function Detailcase() {
  const { case_id } = useParams();
  const navigate = useNavigate();
  const [caseData, setcaseData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseid/${case_id}`)
      .then(function (response) {
        setcaseData(response.data);
        console.log("response", response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  return (
    <Box border={1} sx={{ p: 3 }}>
      {caseData.map((data, index) => (
        <Box key={data.case_id}>
          <Typography sx={{ mb: 1 }}>ชื่องาน : {data.case_title}</Typography>
          <Typography sx={{ mb: 1 }}>
            รายละเอียด : {data.case_detail}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            รายชื่อช่างที่ได้รับมอบหมาย : {data.name}
          </Typography>
        </Box>
      ))}
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/user/statuscase")}
      >
        ย้อนกลับ
      </Button>
    </Box>
  );
}

export default Detailcase;
