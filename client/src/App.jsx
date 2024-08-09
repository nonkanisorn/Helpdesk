import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";

import "./App.css";
//------iimport layout------//
//ADMIN

import Headerbaradmin from "./layout/admin/Headerbaradmin";
import Sidebaradmin from "./layout/admin/Sidebaradmin";

//USER
import Headerbaruser from "./layout/users/Headerbaruser";
import Sidebaruser from "./layout/users/Sidebaruser";

//------Route------//
//ADMIN

import LoginPage from "./components/LoginPage";

//USER

//Manager
import Reportcasetechnician from "./components/technician/Reportcasetech";
import ManagerRoute from "./Routes/ManagerRoute";
import { login } from "./store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/AdminRoute";
import { useState } from "react";
import Notfound404 from "./components/Notfound404";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import TechnicianRoute from "./Routes/TechnicianRoute";
function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับตรวจสอบการโหลด
  const currentUser = async (idToken) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/current-user`, {}, {
        headers: {
          authtoken: idToken
        }
      });
      dispatch(login({
        username: res.data[0].username,
        role: res.data[0].role_id,
        token: idToken,
        name: res.data[0].name,
        users_id: res.data[0].users_id,
      }))
      setLoading(false)
      console.log('resdata', res.data);
      return res.data
    } catch (error) {
      console.error("Error fetching current user:", error);
      setLoading(false)
    }
  };
  useEffect(() => {
    const Token = localStorage.getItem('user');
    if (Token) {
      const idToken = JSON.parse(Token)
      // dispatch(login({
      //   username: res.data[0].username,
      //   role: res.data[0].role,
      //   token: idToken,
      //
      // }))
      dispatch(login(idToken))
      console.log(idToken.token)
      currentUser(idToken.token).then(() => console.log("sucess")).catch((error) => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
    } else {
      console.log("No token found");
      setLoading(false)
    }
  }, [dispatch]);
  if (loading) {
    return null; // ไม่แสดงอะไรในขณะที่กำลังโหลด
  }
  return (
    <>
      <Routes>
        <Route path="*" element={<Notfound404 text="ไม่มีpath" />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/user/*" element={<UserRoute />} />
        <Route path="/manager/*" element={<ManagerRoute />} />
        <Route path="/technician/*" element={<TechnicianRoute />} />
      </Routes>
    </>
  );
}
export default App;
