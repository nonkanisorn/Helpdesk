import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebarmanager from "../layout/manager/Sidebarmanager";
import Headerbarmanager from "../layout/manager/Headerbarmanager";
import { Box } from "@mui/material";
import Reportcase from "../components/Manager/Reportcase";
import Detailcase from "../components/Manager/Detailcase";
import Adduser from "../components/Manager/Adduser";
import { useSelector } from "react-redux";
import Managerpages from "../components/Manager/Managerpages";
import { useEffect } from "react";
import Notfound404 from "../components/Notfound404";
import Statuscase from "../components/Manager/Statuscase";
import Casedetailstatus from "../components/Manager/Casedetailstatus";
const ManagerRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  console.log("manager", user);
  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);
  const text = "No permission";
  return user && user.token && user.role === 2 ? (
    <div className="app">
      <Sidebarmanager />
      <main className="content">
        <Headerbarmanager />
        <div className="content_body">
          <Box m="20px">
            <Routes>
              <Route path="index" element={<Managerpages />} />
              <Route path="reportcase" element={<Reportcase />} />
              <Route path="detail/:case_id" element={<Detailcase />} />
              <Route path="adduser" element={<Adduser />} />
              <Route path="statuscase" element={<Statuscase />} />
              <Route
                path="casedetail/:case_id"
                element={<Casedetailstatus />}
              />
              <Route path="*" element={<Notfound404 />} />
            </Routes>
          </Box>
        </div>
      </main>
    </div>
  ) : (
    <Notfound404 text={text} />
  );
};

export default ManagerRoute;
