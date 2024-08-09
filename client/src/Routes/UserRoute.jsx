import React from 'react'
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebaruser from '../layout/users/Sidebaruser';
import Headerbaruser from '../layout/users/Headerbaruser';
import User from '../components/user/User';
import Addcase from '../components/user/Addcase';
import Historyrepair from '../components/user/Historyrepair';
import Deletecase from "../components/user/Deletecase"
import Notfound404 from '../components/Notfound404';
import { useNavigate } from 'react-router-dom';
import Sidebartech from '../layout/tech/Sidebartech';
import Headerbartech from '../layout/tech/Headerbartech';
import Statuscase from '../components/user/Statuscase';
const UserRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }))
  console.log('userRoute', user)
  console.log('tokenn', user.token)
  // return user && user.token ? children : <h1>No Login</h1>
  return user?.token ? (
    <div className="app">
      <Sidebaruser />
      <main className="content">
        <Headerbaruser />
        <div className="content_body">
          <Box m="19px">
            <Routes>
              <Route path="index" element={<User />} />
              <Route path="addcase" element={<Addcase />} />
              <Route path="historyrepair" element={<Historyrepair />} />
              <Route path="deletecase" element={<Deletecase />} />
              <Route path="statuscase" element={<Statuscase />} />
              <Route path="*" element={<Notfound404 />} />
            </Routes>
          </Box>
        </div>
      </main>
    </div>
  ) : navigate('/login');
};

export default UserRoute;
