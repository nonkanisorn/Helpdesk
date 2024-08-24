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
  const [urlimg, setUrl] = useState("");

  const [refresh, setRefresh] = useState(false);
  const manager_id = useSelector((state) => state.user.users_id);
  const users_id = useSelector((state) => state.user.users_id);

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
        console.log("casedatabyID", casedatabyID);
        const technicianResponse = await axios.get(
          "http://localhost:5011/technicianrole",
        );
        const technicianData = await technicianResponse.data.map(
          (technician) => {
            let url;
            if (technician.user_img !== null && technician.user_img.data) {
              const array = new Uint8Array(technician.user_img.data);
              const blob = new Blob([array], { type: "image/jpeg" });
              url = URL.createObjectURL(blob);
            } else {
              url =
                "https://images.unsplash.com/photo-1724250267025-08b545ab90dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8";
            }
            return {
              id: technician.users_id,
              name: technician.name,
              useremail: technician.user_email,
              userphone: technician.user_phone,
              user_img: url,
            };
          },
        );
        settechnician(technicianData);
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
  console.log("testนะจ้ะ");
  return (
    <Box>
      <Grid container spacing={2}>
        {technician.map((tech, index) => (
          <Grid item key={tech.id} lg={4}>
            <Card sx={{ height: 270, width: 500, bgcolor: "#eeeeee" }}>
              <Box display="flex" justifyContent="space-around">
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    ข้อมูลรายละเอียดช่าง
                  </Typography>
                  <br />
                  <Typography variant="h5">{tech.name}</Typography>
                  <br />
                  <Typography color="text.secondary">
                    Email: {tech.useremail}
                  </Typography>
                  <Typography color="text.secondary">
                    Phone: {tech.userphone}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  image={tech.user_img}
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
}

export default Detailcase;
