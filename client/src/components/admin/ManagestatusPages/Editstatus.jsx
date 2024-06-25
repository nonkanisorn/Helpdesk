import axios from "axios";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editstatus() {
  const navigate = useNavigate();
  const { status_id, status_name } = useParams();
  const [newName, setNewDevName] = useState(status_name);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("newName", newName);

    axios
      .put(`${apiUrl}/Status/${status_id}/${newName}`, formData)
      .then(() => {
        console.log(`Updated device name to: ${newName}`);
        navigate("/admin/Managestatus");
      })
      .catch((error) => {
        console.error("Error updateing data: ", error);
      });

  };
  return (
    <div>
      <h1>แก้ไขสถานะ</h1>
      <p>รหัสสถานะ: {status_id}</p>
      <p>สถานะ: {status_name} </p>
      <form>
        <label>
          แก้ไขเป็น:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewDevName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleUpdate}>
          แก้ไข
        </button>
      </form>
    </div>
  );
}

export default Editstatus;
