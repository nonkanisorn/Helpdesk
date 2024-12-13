import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Devicehistory() {
  const { dev_id } = useParams();
  const [deviceData, setDeviceData] = useState();
  console.log(dev_id);
  useEffect(() => {
    axios.get(`http://localhost:5011/historydevice/${dev_id}`).then((res) => {
      setDeviceData(res.data);
    });
  }, []);
  console.log(deviceData);
  return (
    <>
      <div>ประวัติการซ่อมอุปกรณ์ </div>
    </>
  );
}
export default Devicehistory;
