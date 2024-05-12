import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detailcase() {
  const { case_id } = useParams();
  const [casedatabyID, setcasedatabyID] = useState([]);
  const [imgurl, setImgUrls] = useState([]);

  // casedatabyID.map((casedata)=>{
  //   const blob = new Blob ([casedata.case_img.data])
  //   const bloburl = URL.createObjectURL(blob)

  // })
  useEffect(() => {
    axios
      .get(`http://localhost:5000/case/${case_id}`)
      .then(function (response) {
        // console.log(response)
        setcasedatabyID(response.data);
        console.log(casedatabyID);
        const urls = response.data.map((casedata) => {
          const bufferData = new Uint8Array(casedata.case_img.data);
          const blob = new Blob([bufferData], { type: "image/jpeg" });
          return URL.createObjectURL(blob);
        });
        setImgUrls(urls);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  return (
    <div>
      {casedatabyID.map((casedata) => (
        <div key={casedata.case_id}>
          หัวข้อ: {casedata.case_detail}
          <div>{casedata.technician_name}</div>
          <img src={imgurl} alt="รุป" width={500} height={400}/>
          {imgurl}
        </div>
      ))}
    </div>
  );
}

export default Detailcase;
