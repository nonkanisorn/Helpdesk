import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import { Button } from '@mui/material'
function Detailcasetech() {
  const { case_id } = useParams()
  const navigate = useNavigate()
  const [caseDatabyId, setCaseDatabyId] = useState({})
  console.log(case_id)
  const status_id = 4

  const updatestatuscase = () => {
    axios.patch(`http://localhost:5011/case/${case_id}`, { status_id }).then(() => navigate('/technician/reportcasetech'))
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5011/case/${case_id}`)
        if (response.data && response.data.length > 0) {
          setCaseDatabyId(response.data[0])
          console.log("Response data:", response.data[0])
        } else {
          console.error('No data found for this case ID')
        }
      } catch (error) {
        console.error('Error fetching case data:', error)
      } finally {
      }
    }

    fetchData()
  }, [case_id])
  return (
    <Box>
      <Typography>
        รายละเอียดเคส {caseDatabyId.case_detail}
      </Typography>
      <Typography>
        คนที่มอบหมายงาน :  {caseDatabyId.name}
      </Typography>
      <Button onClick={updatestatuscase}>ปิดงาน</Button>
    </Box>
  )
}

export default Detailcasetech
