import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebaradmin from '../layout/admin/Sidebaradmin'
import Headerbaradmin from '../layout/admin/Headerbaradmin'
import { Box } from '@mui/material'
const AdminRoute = ({ children }) => {
  return (
    <div className="app">
      <Sidebaradmin />
      <main className="content">
        <Headerbaradmin />
        <div className="content_body">
          <Box m="20px">
            {children}
          </Box>
        </div>
      </main>
    </div>
  )
}

export default AdminRoute
