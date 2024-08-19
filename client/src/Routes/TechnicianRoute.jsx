import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebarmanager from "../layout/manager/Sidebarmanager";
import Headerbarmanager from "../layout/manager/Headerbarmanager";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Notfound404 from "../components/Notfound404";
import TechnicianPage from "../components/technician/TechnicianPage";
import Reportcasetech from "../components/technician/Reportcasetech";
import Sidebartech from "../layout/tech/Sidebartech";
import Headerbartech from "../layout/tech/Headerbartech";
import Detailcasetech from "../components/technician/Detailcasetech";
import Histoyrycase from "../components/technician/Historycase";
const TechnicianRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  console.log("tech", user);
  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);
  const text = "No permission";
  return user && user.token && user.role === 3 ? (
    <div className="app">
      <Sidebartech />
      <main className="content">
        <Headerbartech />
        <div className="content_body">
          <Box m="20px">
            <Routes>
              <Route path="index" element={<TechnicianPage />} />
              <Route path="*" element={<Notfound404 />} />
              <Route path="reportcasetech" element={<Reportcasetech />} />
              <Route
                path="Detailcasetech/:case_id"
                element={<Detailcasetech />}
              />
              <Route path="historycase" element={<Histoyrycase />} />
            </Routes>
          </Box>
        </div>
      </main>
    </div>
  ) : (
    <Notfound404 text={text} />
  );
};

export default TechnicianRoute;
