import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

function Detailcase() {
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);
  const [technician, settechnician] = useState([]);

  const [selectedTechnicians, setSelectedTechnicians] = useState({});

  const handleChange = (event, case_id) => {
    const selectedTechnician = event.target.value;
    setSelectedTechnicians((prevState) => ({
      ...prevState,
      [case_id]: selectedTechnician,
    }));
    document.getElementById("tech").innerText = selectedTechnician;
  };

  const sendtech = (case_id) => {
    const technician_name = selectedTechnicians[case_id];
    axios
      .patch(`http://localhost:5000/addtechcase/${case_id}`, {
        technician_name,
      })
      .then(() => {
        console.log(technician_name);
        console.log(selectedTechnicians);
        console.log("FAIL");
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/case/${case_id}`)
      .then(function(response) {
        // console.log(response)
        setcasedatabyID(response.data);
        console.log(casedatabyID);
        console.log(casell)
        const urls = response.data.map((casedata) => {
          const bufferData = new Uint8Array(casedata.case_img.data);
          const blob = new Blob([bufferData], { type: "image/jpeg" });

          return URL.createObjectURL(blob);
        });
        setImgUrls(urls);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() { });
    axios.get("http://localhost:5000/technician").then(function(response) {
      const technicianData = response.data.map(
        (technician) => technician.technician_name
      );
      settechnician(technicianData);
      console.log(technician);
    });
  }, []);
  return (
    <div>
      {casedatabyID.map((casedata) => (
        <div key={casedata.case_id}>
          <h1>หัวข้อ: {casedata.case_detail}</h1>
          <img src={imgurl} alt="รุป" width={500} height={400} />
          <div>{casedata.technician_name}</div>
          <div>{casedata.case_detail}</div>
          <span>รายชื่อช่างที่ได้รับมอบหมาย1111</span>{" "}
          <span id="tech">ยังไม่ได้รับมอบหมาย</span>
          <br></br>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ช่าง"
            value={
              selectedTechnicians[casedata.case_id] || casedata.technician_name
            }
            onChange={(event) => handleChange(event, casedata.case_id)}
            sx={{ mt: 2 }}
          >
            {Array.isArray(technician) &&
              technician.map((techname, index) => (
                <MenuItem key={index} value={techname}>
                  {techname}
                </MenuItem>
              ))}
          </Select>
          <br></br>
          <Button
            onClick={() => sendtech(casedata.case_id)}
            variant="contained"
            sx={{ mt: 2 }}
          >
            เพิ่มช่าง
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Detailcase;
