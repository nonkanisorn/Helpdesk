// import { useParams, useLocation } from "react-router-dom"
// import { Box, Typography } from "@mui/material"
// import axios from "axios"
// import { useState, useEffect } from "react"
// const DeviceDetailPages = () => {
//   const location = useLocation()
//   const { dev_id } = useParams()
//   const [deviceDetail, setDeviceDetail] = useState([])
//   console.log(dev_id)
//   const apiUrl = process.env.REACT_APP_API_URL;
//   // console.log(location.state)
//   useEffect(() => {
//     const fetchDeviceDetailData = () => {
//       axios.get(`${apiUrl}/device/detail/${dev_id}`).then((response) => {
//         setDeviceDetail(response.data)
//       })
//     }
//     fetchDeviceDetailData()
//   }, [])
//   // console.log(deviceDetail[0].dev_name)
//   console.log(deviceDetail)
//   return (
//     <>
//       <Box>รายละเอียดอุปกรณ์</Box>
//       {/* <Typography>อุปกรณ์: {deviceDetail  deviceDetail[0].dev_name}</Typography> */}
//
//     </>
//   )
// }
//
// export default DeviceDetailPages
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const DeviceDetailPages = () => {
  const { dev_id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [deviceDetail, setDeviceDetail] = useState(null); // เริ่ม null
  const [error, setError] = useState(null);
  console.log(dev_id)
  useEffect(() => {
    if (!dev_id) return;
    const fetchDeviceDetailData = () => {
      axios.get(`${apiUrl}/device/detail/${dev_id}`)
      .then(res => setDeviceDetail(res.data))
      .catch(err => setError(err));
    }
    fetchDeviceDetailData()
  }, []);

  if (error) return <Typography color="error">โหลดข้อมูลล้มเหลว</Typography>;
  if (!deviceDetail) return <Typography>กำลังโหลด...</Typography>;

  return (
    <>
      <Box>รายละเอียดอุปกรณ์</Box>
      <Typography>อุปกรณ์: {deviceDetail.dev_name}</Typography>
    </>
  );
};

export default DeviceDetailPages;
