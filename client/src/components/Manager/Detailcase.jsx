import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function Detailcase() {
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);
  const [technician, settechnician] = useState([]);
  const status_id = 2
  const [selectedTechnicians, setSelectedTechnicians] = useState({});

  const [refresh, setRefresh] = useState(false);
  const manager_id = useSelector((state) => state.user.users_id)
  const handleChange = (event, case_id) => {
    const selectedTechnician = event.target.value;
    setSelectedTechnicians((prevState) => ({
      ...prevState,
      [case_id]: selectedTechnician,
    }));
    // document.getElementById("tech").innerText = selectedTechnician;
  };

  const sendtech = (case_id) => {
    const technician_id = selectedTechnicians[case_id];
    axios
      .patch(`http://localhost:5011/addtechcase/${case_id}`, {
        technician_id, manager_id, status_id
      })
      .then(() => {
        console.log(technician_id);
        console.log("selectech", selectedTechnicians);
        console.log("success");
        setSelectedTechnicians({});
        setRefresh(true); // ตั้งค่า refresh ให้เป็น true หลังจากการส่งข้อมูลสำเร็จ
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5011/caseid/${case_id}`)
      .then(function(response) {
        // console.log(response)
        setcasedatabyID(response.data);
        console.log(casedatabyID);
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
    axios.get("http://localhost:5011/technicianrole").then(function(response) {
      const technicianData = response.data.map((technician) => ({
        id: technician.users_id,
        name: technician.name,
      }));
      settechnician(technicianData);
      console.log("tcchData", technicianData)
      console.log("technician", technician)
    });
  }, [case_id, refresh]);

  const getTechnicianName = (id) => {
    const tech = technician.find((tech) => tech.id === id);
    return tech ? tech.name : "ยังไม่ได้รับมอบหมาย";
  };
  useEffect(() => {
    if (refresh) {
      setRefresh(false); // รีเซ็ต refresh หลังจากการดึงข้อมูลใหม่เสร็จสมบูรณ์
    }
  }, [refresh]);
  console.log(selectedTechnicians)
  return (
    <div>
      {casedatabyID.map((casedata) => (
        <div key={casedata.case_id}>
          <h1>หัวข้อ: {casedata.case_topic}</h1>
          <img src={imgurl} alt="รุป" width={500} height={400} />
          <div>{casedata.technician_id}</div>
          <div>{casedata.case_detail}</div>
          <span>รายชื่อช่างที่ได้รับมอบหมาย</span>{" "}
          <span>
            {getTechnicianName(casedata.technician_id)}
          </span>
          <br></br>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ช่าง"
            value={
              selectedTechnicians[casedata.case_id] || casedata.technician_id || ""
            }
            onChange={(event) => handleChange(event, casedata.case_id)}
            sx={{ mt: 2 }}
          >
            {Array.isArray(technician) &&
              technician.map((tech) => (
                <MenuItem key={tech.id} value={tech.id}>
                  {tech.name}
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
