import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editdepartment() {
  const navigate = useNavigate();
  const { dep_id, dep_name } = useParams();
  const [newName, setNewdepName] = useState(dep_name);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("newName", newName);

    axios
      .put(`http://localhost:5000/Department/${dep_id}/${newName}`, formData)
      .then((response) => {
        console.log(`Updated device name to: ${newName}`);
        navigate("/admin/Managedepartment");
      })
      .catch((error) => {
        console.error("Error updateing data: ", error);
      });
  };
  return (
    <div>
      <h1>แก้ไขแผนก</h1>
      <p>ID: {dep_id}</p>
      <p>ใส่แผนก: {dep_id} </p>
      <form>
        <label>
          ใส่แผนกใหม่:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewdepName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default Editdepartment;
