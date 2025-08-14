import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

function Manageuser() {
  const [userData, setUserData] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const confirmDelete = async (dep_id) => {
    const shouldDelete = window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?");
    if (!shouldDelete) {
      return;
    }
  };
  const handleDelete = (users_id) => {
    axios.delete(`${apiUrl}/users/${users_id}`).then(() => {
      console.log("ลบสําเร็จ");
      setrefresh((prev) => !prev);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [refresh]);
  if (!userData || userData.length === 0) {
    return null; // หรือแสดงข้อความแจ้งเตือนอื่นๆ
  }
  console.log(userData);
  return (
    <div>
      <h1>
        จัดการผู้ใช้ {"\u00A0"}
        <Link to="/admin/adduser">
          <Button variant="contained" size="small">
            +ADD
          </Button>
        </Link>
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ชื่อ</TableCell>
              <TableCell>บทบาท</TableCell>
              <TableCell>แก้ไข / ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.users_id} </TableCell>

                <TableCell>{item.name}</TableCell>
                <TableCell>{item.role_name}</TableCell>
                <TableCell>
                  <Link to={`/admin/edituser/${item.users_id}`}>
                    <Button
                      variant="contained"
                      sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                    >
                      แก้ไข
                    </Button>
                  </Link>

                  <Button
                    onClick={() => {
                      handleDelete(item.users_id);
                    }}
                    variant="contained"
                    sx={{
                      fontSize: "12px",
                      backgroundColor: "red",
                      marginLeft: 3,
                    }}
                  >
                    ลบ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Manageuser;
