import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editrole() {
  const navigate = useNavigate();
  const { role_id, role_name } = useParams();
  const [newName, setNewpoName] = useState(role_name);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("role_name", newName);

    axios
      .put(`${apiUrl}/role/${role_id}/${newName}`, formData)
      .then((response) => {
        console.log(`Updated device name to: ${newName}`);
        navigate("/admin/Managerole");
      })
      .catch((error) => {
        console.error("Error updateing data: ", error);
      });
  };
  return (
    <div>
      <h1>แก้ไขตำแหน่ง</h1><p>ID: {role_id}</p>
      <p>ตำแหน่ง: {role_name} </p>
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

export default Editrole;
