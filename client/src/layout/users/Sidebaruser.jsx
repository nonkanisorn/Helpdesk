import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from "@mui/icons-material/TableView";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useSelector } from "react-redux";
const Sidebaruser = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const userName = useSelector((state) => state.user.name);
  const users_id = useSelector((state) => state.user.users_id);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (users_id) {
      const fetchdata = async () => {
        const response = await axios.get(
          `http://localhost:5011/userbyid/${users_id}`,
        );
        if (response.data[0].user_img.data.length === 0) {
          setUrl(
            "https://images.unsplash.com/photo-1719205153554-33eb4834cc36?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          );
        } else {
          const user = response.data[0];
          console.log(response);
          const array = new Uint8Array(user.user_img.data);
          const blob = new Blob([array], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          setUrl(url);
        }
      };

      fetchdata();
    }
  }, [users_id]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        style={{ height: "100%", backgroundColor: "#1a237e" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography>REPAIR APP</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={url}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0" }}>{userName}</Typography>
                  </Box>
                </Box>
              )}
              <Link to="/user/index" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>หน้าหลัก</MenuItem>
              </Link>
              <Link to="/user/Addcase" className="menu-bars">
                <MenuItem icon={<ConstructionOutlinedIcon />}>
                  แจ้งซ่อม
                </MenuItem>
              </Link>
              <Link to="/user/statuscase" className="menu-bars">
                <MenuItem icon={<ConstructionOutlinedIcon />}>
                  สถานะการแจ้งซ่อม
                </MenuItem>
              </Link>
              <Link to="/user/Historyrepair" className="menu-bars">
                <MenuItem icon={<HistoryToggleOffIcon />}>
                  ประวัติการแจ้งซ่อม
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Sidebaruser;
