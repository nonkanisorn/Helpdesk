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

function Manageposition() {
  const [positionData, setPositiondata] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const Deleteposition = async (position_id) => {
    const shouldDelete = window.confirm("คุณต้องการลบอุปกรณ์นี้หรือไม่?");
    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`${apiUrl}/Position/${position_id}`)
      .then((response) => {
        console.log(response.data);
        axios
          .get(`${apiUrl}/Position`)
          .then((response) => {
            setPositiondata(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error("Error deeteing data: ", error``);
      });
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/Position`)
      .then(function(response) {
        setPositiondata(response.data);
        console.log(positionData);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() { });
  }, []);

  return (
    <div>
      <h1>
        จัดการตำแหน่ง {"\u00A0"}
        <Link to="/admin/Addposition">
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
              <TableCell>ตำแหน่ง</TableCell>
              <TableCell>แก้ไข / ลบ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positionData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {item.dev_id}
                </TableCell> */}
                <TableCell>{item.position_id} </TableCell>

                <TableCell>{item.position_name}</TableCell>
                <TableCell>
                  <Link
                    to={`/admin/Editposition/${item.position_id}/${item.position_name}`}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: "12px", backgroundColor: "#FF9933" }}
                    >
                      แก้ไข
                    </Button>
                  </Link>

                  <Button
                    onClick={() => Deleteposition(item.position_id)}
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
export default Manageposition;
