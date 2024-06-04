// import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
function LoginPage() {
  const [username, setusername] = useState(""); // สร้าง state สำหรับเก็บค่า username
  const [userpassword, setuserpassword] = useState("");
  console.log(userpassword)
  const Login = () => {
    // ฟังก์ชันที่ใช้สำหรับการเข้าสู่ระบบ
    // ทำการส่งข้อมูลเข้าสู่ระบบด้วย axios หรือวิธีอื่น ๆ ที่คุณต้องการ
    axios.post("http://localhost:5011/login", { username, userpassword })
      .then(response => {
        // ดำเนินการหลังจากเข้าสู่ระบบสำเร็p
        console.log(response.data)
      })
      .catch(error => {
        // ดำเนินการเมื่อมีข้อผิดพลาดเกิดขึ้นในการเข้าสู่ระบบ
      });
  };

  return (
    <div className="login">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          m: 1,
          height: "100vh", // ตั้งค่าความสูงของ Box เพื่อให้ Card อยู่ตรงกลางหน้าจอ
        }}
      >
        <Card sx={{ minWidth: 450, minHeight: 450, borderRadius: 4 }}>
          <CardContent>
            <Typography
              sx={{}}
              fontWeight="bold"
              variant="h4"
              marginRight={3}
              color="text.primary"
              textAlign={"center"}
              gutterBottom
            >
              Sign in to Repair system
            </Typography>
            <Typography
              variant="body2"
              component="p"
              gutterBotto
              marginBottom={3}
            >
              Dont have an account? <Link to="/register">Get Started</Link>
            </Typography>
            <Typography
              component="div"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={(e) => setusername(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => setuserpassword(e.target.value)}
              />
            </Typography>
            <Typography variant="body2" mt={4} textAlign={"right"}>
              Forgot Password?
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={Login}
              variant="contained"
              color="primary"
              sx={{ width: "80%", height: "50px", marginLeft: 5 }}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
export default LoginPage;
