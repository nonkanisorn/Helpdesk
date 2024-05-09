import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";

import "./App.css";
//------iimport layout------//
//ADMIN
// import Headerbaradmin from "./layout/admin/Headerbaradmin";
import Headerbaradmin from "./layout/admin/Headerbaradmin";
import Sidebaradmin from "./layout/admin/Sidebaradmin";

//USER
import Headerbaruser from "./layout/users/Headerbaruser";
import Sidebaruser from "./layout/users/Sidebaruser";

//------Route------//
//ADMIN

import LoginPage from "./components/LoginPage";
import Manageuser from "./components/admin/ManageuserPages/Manageuser";
import Manageposition from "./components/admin/ManagepositionPages/Manageposition";
import Managedevice from "./components/admin/ManagedevicePages/Managedevice";
import Managestatus from "./components/admin/ManagestatusPages/Managestatus";
import Adddevice from "./components/admin/ManagedevicePages/Adddevice";
import Editdevice from "./components/admin/ManagedevicePages/Editdevice";
import Editposition from "./components/admin/ManagepositionPages/Editposition";
import Addposition from "./components/admin/ManagepositionPages/Addposition";
import Managedepartment from "./components/admin/ManagedepartmentPages/Managedepartment";
import Adddepartment from "./components/admin/ManagedepartmentPages/Adddeparment";
import Editdepartment from "./components/admin/ManagedepartmentPages/Editdepartment";
import Adminpages from "./components/admin/adminpages";
import Addstatus from "./components/admin/ManagestatusPages/Addstatus";

//USER
import Addcase from "./components/user/Addcase";
import Historyrepair from "./components/user/Historyrepair";
import Deletecase from "./components/user/Deletecase";

//Manager
import Sidebarmanager from "./layout/manager/Sidebarmanager";
import Headerbarmanager from "./layout/manager/Headerbarmanager";
import Reportcase from "./components/Manager/Reportcase";
import Reportcasetechnician from "./components/technician/Reportcasetech";
import Editstatus from "./components/admin/ManagestatusPages/Editstatus";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <div className="app">
        <Routes>
          <Route
            path="/admin/*"
            element={
              <>
                <Sidebaradmin />
                <main className="content">
                  <Headerbaradmin />
                  <div className="content_body">
                    <Box m="20px">
                      <Routes>
                        <Route path="manageuser" element={<Manageuser />} />
                        <Route
                          path="manageposition"
                          element={<Manageposition />}
                        />
                        <Route path="managedevice" element={<Managedevice />} />
                        <Route path="adminpage" element={<Adminpages />} />
                        <Route path="managestatus" element={<Managestatus />} />
                        <Route
                          path="managedepartment"
                          element={<Managedepartment />}
                        />
                        <Route path="adddevice" element={<Adddevice />} />
                        <Route
                          path="editdevice/:dev_id/:dev_name"
                          element={<Editdevice />}
                        />
                        <Route path="addposition" element={<Addposition />} />
                        <Route
                          path="editposition/:position_id/:position_name"
                          element={<Editposition />}
                        />
                        <Route path="addstatus" element={<Addstatus />} />
                        <Route
                          path="editstatus/:status_id/:status_name"
                          element={<Editstatus />}
                        />
                        <Route
                          path="adddepartment"
                          element={<Adddepartment />}
                        />
                        <Route
                          path="editdepartment/:dep_id/:dep_name"
                          element={<Editdepartment />}
                        />
                      </Routes>
                    </Box>
                  </div>
                </main>
              </>
            }
          />
          <Route
            path="/user/*"
            element={
              <>
                <Sidebaruser />
                <main className="content">
                  <Headerbaruser />
                  <div className="content_body">
                    <Box m="20px">
                      <Routes>
                        <Route path="addcase" element={<Addcase />} />
                        <Route
                          path="historyrepair"
                          element={<Historyrepair />}
                        />
                        <Route path="deletecase" element={<Deletecase />} />

                        {/* อาจเพิ่มเส้นทางอื่น ๆ สำหรับผู้ใช้ได้ตามต้องการ */}
                      </Routes>
                    </Box>
                  </div>
                </main>
              </>
            }
          />
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

                        {/* อาจเพิ่มเส้นทางอื่น ๆ สำหรับผู้ใช้ได้ตามต้องการ */}
                      </Routes>
                    </Box>
                  </div>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
