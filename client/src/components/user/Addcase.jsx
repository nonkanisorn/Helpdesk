import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import axios from "axios";

import { useSelector } from "react-redux";

import { useRef, useState, useEffect } from "react";

function Addcase() {
  const [caseDetail, setCaseDetail] = useState("");
  const [case_title, setcase_title] = useState("");
  const [caseImg, setCaseImg] = useState("");
  const [buildingName, setBuildingname] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [depname, setDepname] = useState([]);
  const [fetchtrigger, setFetchtrigger] = useState(false);
  const [file, setFile] = useState(null);
  const status_id = 1;
  const inputFileRef = useRef();
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = useSelector((state) => state.user.users_id);
  const userName = useSelector((state) => state.user.name);
  const handlebuildingChange = (event) => {
    setBuildingname(event.target.value);
  };
  const handledepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  const handlefilechange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(case_title);
  const createcase = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.post(
        "http://localhost:5011/Case",
        {
          // dep_name: selectedDepartment,
          case_detail: caseDetail,
          user_id: userId,
          status_id,
          case_title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      axios
        .post(`${apiUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log("success file");
          console.log(file);
        });
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setFile(null);
      setCaseDetail("");
      setCaseImg(null);
      setBuildingname("");
      setDepname("");
      setSelectedDepartment("");
      setcase_title("");

      //ใช้ NOT ! เพื่อsetFetchtrigger ให้เปลี่ยนค่า จากเดิมที่กดหนดเป็นfalse ให้เป็นtrue
      setFetchtrigger(!fetchtrigger);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5011/department`)
      .then(function (response) {
        setDepname(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [fetchtrigger]);
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        border: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h2" textAlign="center">
        {" "}
        แจ้งซ่อม
      </Typography>
      <Typography variant="h4">แจ้งซ่อมโดยคุณ:{userName}</Typography>
      <FormControl variant="standard">
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 15 }}
        >
          <Typography sx={{ ml: 1 }}>test:</Typography>
          <TextField
            id="case_title"
            type="text"
            value={case_title}
            onChange={(e) => setcase_title(e.target.value)}
            placeholder="ใส่หัวข้อ"
          />
        </div>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="div">รายละเอียด</Typography>
          <TextField
            id="case_detail"
            type="text"
            value={caseDetail}
            onChange={(e) => setCaseDetail(e.target.value)}
            placeholder="ใส่รายละเอียด"
            sx={{ marginLeft: 2, mb: 2 }}
          />
        </Box>
        <Button color="success" variant="contained" onClick={createcase}>
          เพิ่มการแจ้งซ่อม
        </Button>
      </FormControl>
    </Box>
  );
}

export default Addcase;
