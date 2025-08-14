import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Paperui from "../ui/Paperui";

function User() {
  const [casedata, setcasedata] = useState([]);
  console.log(casedata);
  const data = useSelector((state) => state.user.users_id);
  console.log("data", data);
  const casedatalenght = () => {
    return casedata.length;
  };
  const datafilterstatuscase4 = () => {
    return casedata.filter((data) => data.status_id === 4).length;
  };

  const datafilterstatuscase3 = () => {
    return casedata.filter((data) => data.status_id === 3).length;
  };
  const datafilterstatuscase2 = () => {
    return casedata.filter((data) => data.status_id === 2).length;
  };
  const datafilterstatuscase1 = () => {
    return casedata.filter((data) => data.status_id === 1).length;
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5011/caseuserstatus/${data}`)
  //     .then((response) => {
  //       setcasedata(response.data);
  //     });
  // }, []);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5011/caseuserstatus/${data}`,
        );
        setcasedata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Paperui title="จำนวทั้งหมด" data={casedatalenght()} />
        <Paperui title="รอดำเนินการ" data={datafilterstatuscase1()} />
        <Paperui title="กำลังดำเนินการ" data={datafilterstatuscase2()} />
        <Paperui title="รอการยืนยัน" data={datafilterstatuscase3()} />
        <Paperui title="เสร็จสิ้น" data={datafilterstatuscase4()} />
        {/* <Typography */}
        {/*   sx={{ */}
        {/*     border: 1, */}
        {/*     borderStyle: "none", */}
        {/*     borderRadius: "5px", */}
        {/*     padding: "2px", */}
        {/*     width: "150px", */}
        {/*     height: "40px", */}
        {/*     display: "flex", */}
        {/*     justifyContent: "center", */}
        {/*     alignItems: "center", */}
        {/*     textAlign: "center", */}
        {/*     bgcolor: "#ADD8E6", */}
        {/*     mr: "10px", */}
        {/*   }} */}
        {/* > */}
        {/*   จำนวนทั้งหมด : {casedatalenght()} */}
        {/* </Typography>{" "} */}
        {/* <Typography */}
        {/*   sx={{ */}
        {/*     border: 1, */}
        {/*     borderStyle: "none", */}
        {/*     borderRadius: "5px", */}
        {/*     padding: "2px", */}
        {/*     width: "150px", */}
        {/*     height: "40px", */}
        {/*     display: "flex", */}
        {/*     justifyContent: "center", */}
        {/*     alignItems: "center", */}
        {/*     textAlign: "center", */}
        {/*     bgcolor: "#FFD580", */}
        {/*     mr: "10px", */}
        {/*   }} */}
        {/* > */}
        {/*   รอดำเนินการ : {datafilterstatuscase1()}{" "} */}
        {/* </Typography>{" "} */}
        {/* <Typography */}
        {/*   sx={{ */}
        {/*     border: 1, */}
        {/*     borderStyle: "none", */}
        {/*     borderRadius: "5px", */}
        {/*     padding: "2px", */}
        {/*     width: "150px", */}
        {/*     height: "40px", */}
        {/*     display: "flex", */}
        {/*     justifyContent: "center", */}
        {/*     alignItems: "center", */}
        {/*     textAlign: "center", */}
        {/*     bgcolor: "#FFFACD", */}
        {/*     mr: "10px", */}
        {/*   }} */}
        {/* > */}
        {/*   กำลังดำเนินการ : {datafilterstatuscase2()}{" "} */}
        {/* </Typography>{" "} */}
        {/* <Typography */}
        {/*   sx={{ */}
        {/*     border: 1, */}
        {/*     borderStyle: "none", */}
        {/*     borderRadius: "5px", */}
        {/*     padding: "2px", */}
        {/*     width: "150px", */}
        {/*     height: "40px", */}
        {/*     display: "flex", */}
        {/*     justifyContent: "center", */}
        {/*     alignItems: "center", */}
        {/*     textAlign: "center", */}
        {/*     bgcolor: "#D8BFD8", */}
        {/*     mr: "10px", */}
        {/*   }} */}
        {/* > */}
        {/*   รอการยืนยัน : {datafilterstatuscase4()}{" "} */}
        {/* </Typography>{" "} */}
        {/* <Typography */}
        {/*   sx={{ */}
        {/*     border: 1, */}
        {/*     borderStyle: "none", */}
        {/*     borderRadius: "5px", */}
        {/*     padding: "2px", */}
        {/*     width: "150px", */}
        {/*     height: "40px", */}
        {/*     display: "flex", */}
        {/*     justifyContent: "center", */}
        {/*     alignItems: "center", */}
        {/*     textAlign: "center", */}
        {/*     bgcolor: "#90EE90", */}
        {/*     mr: "10px", */}
        {/*   }} */}
        {/* > */}
        {/*   เสร็จสิน : {datafilterstatuscase3()}{" "} */}
        {/* </Typography>{" "} */}
      </Box>
    </Box>
  );
}
export default User;
