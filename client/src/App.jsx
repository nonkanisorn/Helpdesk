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
import Addcase from "./components/user/Addcase";
import Historyrepair from "./components/user/Historyrepair";
import Deletecase from "./components/user/Deletecase";
import User from "./components/user/User";

//Manager
import Sidebarmanager from "./layout/manager/Sidebarmanager";
import Headerbarmanager from "./layout/manager/Headerbarmanager";
import Reportcase from "./components/Manager/Reportcase";
import Reportcasetechnician from "./components/technician/Reportcasetech";
import Editstatus from "./components/admin/ManagestatusPages/Editstatus";
import Detailcase from "./components/Manager/Detailcase";
import Adduser from "./components/Manager/Adduser";

import { login } from "./store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/ AdminRoute";
import { useState } from "react";
import Notfound404 from "./components/Notfound404";
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
        role: res.data[0].role,
        token: idToken,
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/user/*" element={<UserRoute />} />
      </Routes>
      <div className="app">
        <Routes>
          <Route
            path="/technician/*"
            element={
              <>
                <Sidebaruser />
                <main className="content">
                  <Headerbaruser />
                  <div className="content_body">
                    <Box m="20px">
                      <Routes>
                        <Route
                          path="reportcasetech"
                          element={<Reportcasetechnician />}
                        />

                        <Route path="*" element={<Notfound404 />} />
                        {/* อาจเพิ่มเส้นทางอื่น ๆ สำหรับผู้ใช้ได้ตามต้องการ */}
                      </Routes>
                    </Box>
                  </div>
                </main>
              </>
            }
          />
          <Route
            path="/manager/*"
            element={
              <>
                <Sidebarmanager />
                <main className="content">
                  <Headerbarmanager />
                  <div className="content_body">
                    <Box m="20px">
                      <Routes>
                        <Route
                          path="reportcase"
                          element={<Reportcase />}
                        />
                        <Route
                          path="detail/:case_id"
                          element={<Detailcase />}
                        />
                        <Route
                          path="adduser"
                          element={<Adduser />}
                        />
                        {/* อาจเพิ่มเส้นทางอื่น ๆ สำหรับผู้ใช้ได้ตามต้องการ */}
                      </Routes>
                    </Box>
                  </div>
                </main>
              </>
            }
          />
        </Routes>
      </div >
    </>
  );
}
export default App;
