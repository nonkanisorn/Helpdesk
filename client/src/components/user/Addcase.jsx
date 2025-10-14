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
        p: 5,
        maxWidth: 600,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        แจ้งซ่อม
      </Typography>
      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        โดยคุณ: {userName}
      </Typography>

      {/* ฟอร์ม */}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {/* หัวข้อ */}
        <TextField
          label="หัวข้อ"
          id="case_title"
          value={case_title}
          onChange={(e) => setcase_title(e.target.value)}
          placeholder="กรอกหัวข้อการแจ้งซ่อม"
          fullWidth
        />

        {/* รายละเอียด */}
        <TextField
          label="รายละเอียด"
          id="case_detail"
          value={caseDetail}
          onChange={(e) => setCaseDetail(e.target.value)}
          placeholder="กรอกรายละเอียดปัญหา"
          multiline
          rows={4}
          fullWidth
        />

        {/* ประเภทปัญหา */}
        <FormControl fullWidth>
          <InputLabel id="problem-type-label">ประเภทปัญหา</InputLabel>
          <Select
            labelId="problem-type-label"
            value={selectcategory}
            onChange={(e) => setSelectcategory(e.target.value)}
          >
            {categories.map((item) => (
              <MenuItem key={item.categories_id} value={item.categories_id}>
                {item.categories_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ปุ่ม */}
        <Button
          color="success"
          variant="contained"
          onClick={createcase}
          sx={{ mt: 2, py: 1.5 }}
        >
          เพิ่มการแจ้งซ่อม
        </Button>
      </Box>
    </Paper>
  );
}

export default Addcase;
