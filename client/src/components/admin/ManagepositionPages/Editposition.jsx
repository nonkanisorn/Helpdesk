import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editposition() {
  const navigate = useNavigate();
  const { position_id, position_name } = useParams();
  const [newName, setNewpoName] = useState(position_name);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("position_name", newName);

    axios
      .put(`${apiUrl}/Position/${position_id}/${newName}`, formData)
      .then((response) => {
        console.log(`Updated device name to: ${newName}`);
        navigate("/admin/Manageposition");
      })
      .catch((error) => {
        console.error("Error updateing data: ", error);
      });
  };
  return (
    <div>
      <h1>แก้ไขตำแหน่ง</h1><p>ID: {position_id}</p>
      <p>ตำแหน่ง: {position_name} </p>
      <form>
        <label>
          ใส่ตำแหน่งใหม่:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewpoName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default Editposition;
