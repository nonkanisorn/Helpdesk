import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import axios from "axios";

import { useState, useEffect } from "react";

function Addcase() {
  const [caseDetail, setCaseDetail] = useState("");
  const [caseImg, setCaseImg] = useState("");
  const [buildingName, setBuildingname] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [depname, setDepname] = useState([]);
  const [fetchtrigger, setFetchtrigger] = useState(false)
  const [depname2, setDepname2] = useState([]);
  const handlebuildingChange = (event) => {
    setBuildingname(event.target.value);
  };
  const handledepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  }
  // const dep2 = axios
  //   .get(`http://localhost:5011/department`)
  // .then(function(response) {
  //   setDepname2(response.data);
  //   console.log(depname);
  // })
  // .catch(function(error) {
  //   console.log(error);
  // });

  const createcase = async (e, event) => {
    e.preventDefault();

    //const formData = new FormData();
    // formData.append("case_img", caseImg);
    //formData.append("dep_name", selectedDepartment);

    // formData.append("case_detail", caseDetail);


    try {
      const response = await axios.post(
        "http://localhost:5011/Case",
        {
          dep_name: selectedDepartment,
          case_detail: caseDetail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCaseDetail("");
      setCaseImg(null);
      setBuildingname("");
      setDepname("");
      setSelectedDepartment("");

      //ใช้ NOT ! เพื่อsetFetchtrigger ให้เปลี่ยนค่า จากเดิมที่กดหนดเป็นfalse ให้เป็นtrue
      setFetchtrigger(!fetchtrigger)

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5011/department`)
      .then(function(response) {
        setDepname(response.data);
      })
      .catch(function(error) {
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
      <div>แจ้งซ่อม โดยคุณ</div>
      <FormControl variant="standard">
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          <FormControl variant="standard" fullWidth>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>อาคาร</span>
              <Select
                labelId="building-select-label"
                id="building-select"
                value={buildingName}
                label="อาคาร"
                onChange={handlebuildingChange}
              >
                <MenuItem value={10}>อาคาร1</MenuItem>
                <MenuItem value={20}>อาคาร2</MenuItem>
                <MenuItem value={30}>อาคาร3</MenuItem>
              </Select>
            </div>
          </FormControl>
        </div>
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          <FormControl variant="standard" fullWidth>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>แผนก : </span>
              <Select
                labelId="department-select-label"
                id="department-select"
                //value={dep.dep_name}
                value={selectedDepartment}
                onChange={handledepartmentChange}
                label="แผนก"
              //onChange={(event) => handleChange(event)}
              >
                {Array.isArray(depname) && depname.map((dep, index) => (
                  <MenuItem key={index} value={dep.dep_name}>
                    {dep.dep_name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </FormControl>
        </div>
        <div style={{ marginLeft: 15, marginBottom: 15 }}>
          รายละเอียด :
          <TextField
            id="case_detail"
            type="text"
            value={caseDetail}
            onChange={(e) => setCaseDetail(e.target.value)}
            placeholder="ใส่รายละเอียด"
            sx={{ marginLeft: 2 }}
          />
        </div>
        {/* <div style={{ marginLeft: 15, marginBottom: 15 }}>
          รูปภาพ :
          <input
            id="case_img"
            type="file"
            // value={caseImg}
            onChange={(e) => setCaseImg(e.target.files[0])}
            // placeholder="ใส่รูปภาพ"
          />
        </div> */}
        {/* <InputLabel htmlFor="component-simple" ></InputLabel> */}
        <Button onClick={createcase}>เพิ่มการแจ้งซ่อม</Button>
      </FormControl>
    </Box>
  );
}

export default Addcase;
