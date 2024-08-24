import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

function LoginPage() {
  const [username, setusername] = useState(""); // สร้าง state สำหรับเก็บค่า username
  const [userpassword, setuserpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5011/login", {
        username,
        userpassword,
      });
      // ดำเนินการหลังจากเข้าสู่ระบบสำเร็จ
      console.log("loginresponse", response.data);
      dispatch(
        login({
          username: response.data.payload.user,
          role: response.data.payload.user.role,
          token: response.data.token,
          name: response.data.payload.user.name,
          users_id: response.data.payload.user.users_id,
        }),
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: response.data.payload.user,
          role: response.data.payload.user.role,
          token: response.data.token,
          users_id: response.data.payload.user.users_id,
        }),
      );
      // localStorage.setItem("token", response.data.token)
      roleRedirects(response.data.payload.user.role);
    } catch (error) {
      // ดำเนินการเมื่อมีข้อผิดพลาดเกิดขึ้นในการเข้าสู่ระบบ
      console.error("There was an error logging in!", error);
      alert("Failed to login. Please check your username and password.");
    }
  };
  const roleRedirects = (role) => {
    // console.log(role)
    if (role === 1) {
      navigate("/admin/index");
    } else if (role == 2) {
      navigate("/manager/index");
    } else if (role == 3) {
      navigate("/technician/index");
    } else {
      navigate("/user/index");
    }
  };
  // useEffect(() => {
  //
  //   handleLogin()
  // }, [])
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
        <Card sx={{ minWidth: 450, minHeight: 400, borderRadius: 4 }}>
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
              Repair system
            </Typography>
            <Typography
              component="div"
              sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}
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
                type="password"
                variant="outlined"
                onChange={(e) => setuserpassword(e.target.value)}
              />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              onClick={handleLogin}
              color="primary"
              sx={{ width: "80%", height: "50px", marginLeft: 5, mt: 5 }}
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
