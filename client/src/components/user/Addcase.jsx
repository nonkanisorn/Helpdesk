import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton, Typography, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import axios from "axios";

import { useSelector } from "react-redux";

import { useRef, useState, useEffect } from "react";

function Addcase() {
  const [caseDetail, setCaseDetail] = useState("");
  const [case_title, setcase_title] = useState("");
  const [categories, setCategories] = useState([]);
  const [fetchtrigger, setFetchtrigger] = useState(false);
  const [dataDev, setDataDev] = useState([]);
  const [selectcategory, setSelectcategory] = useState("");
  const status_id = 1;
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = useSelector((state) => state.user.users_id);
  const userName = useSelector((state) => state.user.name);
  const createcase = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5011/Case",
        {
          // dep_name: selectedDepartment,
          case_title,
          case_detail: caseDetail,
          case_device_id: null,
          user_id: userId,
          status_id,
          categories_id: selectcategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setCaseDetail("");
      setcase_title("");
      setSelectcategory("");
      //ใช้ NOT ! เพื่อsetFetchtrigger ให้เปลี่ยนค่า จากเดิมที่กดหนดเป็นfalse ให้เป็นtrue
      setFetchtrigger(!fetchtrigger);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(apiUrl + "/device");
        setDataDev(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(apiUrl + "/categoriesdevice");
        setCategories(response.data);
      };
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(selectcategory);
  return (
    <Paper
      sx={{
        "& > :not(style)": { m: 1 },
        // border: 1,
        padding: 7,
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
          <Typography sx={{ ml: 1 }}>หัวข้อ : </Typography>
          <TextField
            id="case_title"
            type="text"
            value={case_title}
            onChange={(e) => setcase_title(e.target.value)}
            placeholder="ใส่หัวข้อ"
            sx={{
              ml: 3,
            }}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="div">ประเภทปัญหา</Typography>
          <Select
            sx={{ ml: 3 }}
            onChange={(e) => setSelectcategory(e.target.value)}
            value={selectcategory}
          >
            {categories.map((item, idx) => (
              <MenuItem key={item.id} value={item.categories_id}>
                {item.categories_name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          color="success"
          variant="contained"
          onClick={createcase}
          sx={{ mt: 5 }}
        >
          เพิ่มการแจ้งซ่อม
        </Button>
      </FormControl>
    </Paper>
  );
}

export default Addcase;
