import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Historydevice() {
  const navigate = useNavigate();
  const [deviceData, setDevicedata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5011/device").then((res) => {
      setDevicedata(res.data);
    });
  }, []);
  console.log(deviceData);
  const tohistorydevice = (dev_id) => {
    navigate(`/manager/device/history/${dev_id}`);
  };

  return (
    <>
      <div>historydevice</div>
      {deviceData.map((item, idx) => {
        return (
          <button key={idx} onClick={() => tohistorydevice(item.dev_id)}>
            {item.dev_name}
          </button>
        );
      })}
    </>
  );
}
export default Historydevice;
