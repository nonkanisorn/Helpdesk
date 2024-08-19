import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import CardMedia from "@mui/material/CardMedia";
import Profilecard from "../Profilecard";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Detailcase() {
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);
  const [technician, settechnician] = useState([]);
  const status_id = 2;
  const [selectedTechnicians, setSelectedTechnicians] = useState({});
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const manager_id = useSelector((state) => state.user.users_id);

  const [techid, setTechid] = useState();
  const sendtech = async (case_id, techid) => {
    await axios
      .patch(`http://localhost:5011/addtechcase/${case_id}`, {
        technician_id: techid,
        manager_id,
        status_id,
      })
      .then(() => {
        console.log("selectech", selectedTechnicians);
        console.log("success");
        setSelectedTechnicians({});
        setRefresh(true); // ตั้งค่า refresh ให้เป็น true หลังจากการส่งข้อมูลสำเร็จ
        navigate("/manager/reportcase");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const caseResponse = await axios.get(
          `http://localhost:5011/caseidtest/${case_id}`,
        );
        console.log(caseResponse);
        const caseData = caseResponse.data;
        setcasedatabyID(caseData);
        console.log("casedatabyID", casedatabyID);
        const technicianResponse = await axios.get(
          "http://localhost:5011/technicianrole",
        );
        const technicianData = await technicianResponse.data.map(
          (technician) => ({
            id: technician.users_id,
            name: technician.name,
          }),
        );
        settechnician(technicianData);
        console.log("tcchData", technicianData);
        console.log("technician", technicianData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
    console.log("tec", technician);
  }, [case_id]);

  const getTechnicianName = (id) => {
    const tech = technician.find((tech) => tech.id === id);
    return tech ? tech.name : "ยังไม่ได้รับมอบหมาย";
  };
  useEffect(() => {
    if (refresh) {
      setRefresh(false); // รีเซ็ต refresh หลังจากการดึงข้อมูลใหม่เสร็จสมบูรณ์
    }
  }, [refresh]);
  console.log(selectedTechnicians);
  return (
    <Box>
      <Grid container spacing={2}>
        {technician.map((tech, index) => (
          <Grid item key={tech.id} lg={4}>
            <Card sx={{ height: 250, width: 500, bgcolor: "#eeeeee" }}>
              <Box display="flex" justifyContent="space-around">
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    ข้อมูลรายละเอียดช่าง
                  </Typography>
                  <br />
                  <Typography variant="h5">{tech.name}</Typography>
                  <br />
                  <Typography color="text.secondary">Email</Typography>
                  <Typography color="text.secondary">Phone</Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1719937206498-b31844530a96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                  sx={{ width: 195, borderRadius: "50%" }}
                ></CardMedia>
              </Box>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    sendtech(case_id, tech.id);
                  }}
                >
                  {" "}
                  เพิ่มช่าง
                </Button>
                <Button variant="contained" size="medium" color="info">
                  {" "}
                  ดูตารางงานช่าง
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  // <div>
  //   {casedatabyID.map((casedata) => (
  //     <div key={casedata.case_id}>
  //       <h1>หัวข้อ: {casedata.case_topic}</h1>
  //       <span>รายละเอียด:</span>
  //       <span>{casedata.case_detail}</span>
  //       <br></br>
  //       <span>รายชื่อช่างที่ได้รับมอบหมาย</span>{" "}
  //       <span>{getTechnicianName(casedata.technician_id)}</span>
  //       <br></br>
  //       <Select
  //         labelId="demo-simple-select-label"
  //         id="demo-simple-select"
  //         label="ช่าง"
  //         value={
  //           selectedTechnicians[casedata.case_id] ||
  //           casedata.technician_id ||
  //           ""
  //         }
  //         onChange={(event) => handleChange(event, casedata.case_id)}
  //         sx={{ mt: 2 }}
  //       >
  //         {Array.isArray(technician) &&
  //           technician.map((tech) => (
  //             <MenuItem key={tech.id} value={tech.id}>
  //               {tech.name}
  //             </MenuItem>
  //           ))}
  //       </Select>
  //       <br></br>
  //       <Button
  //         onClick={() => sendtech(casedata.case_id)}
  //         variant="contained"
  //         sx={{ mt: 2 }}
  //       >
  //         เพิ่มช่าง
  //       </Button>
  //     </div>
  //   ))}
  // </div>
}

export default Detailcase;
