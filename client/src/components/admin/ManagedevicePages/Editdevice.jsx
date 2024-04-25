import axios from "axios";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editdevice() {
  const navigate = useNavigate();
  const { dev_id, dev_name } = useParams();
  const [newName, setNewDevName] = useState(dev_name);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("newName", newName);

    axios
      .put(`http://localhost:5000/Device/${dev_id}/${newName}`, formData)
      .then(() => {
        console.log(`Updated device name to: ${newName}`);
        navigate("/admin/Managedevice");
      })
      .catch((error) => {
        console.error("Error updateing data: ", error);
      });
      
  };
  return (
    <div>
      <h1>Edit device</h1>/<p>Device ID: {dev_id}</p>
      <p>Device Name: {dev_name} </p>
      <form>
        <label>
          New Device Name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewDevName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default Editdevice;
