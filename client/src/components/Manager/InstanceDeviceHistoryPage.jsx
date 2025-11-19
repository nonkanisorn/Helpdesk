import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
const InstanceDeviceHistoryPage = () => {
  const { instance_id } = useParams;
  console.log(instance_id);
  return (
    <>
      <Typography variant="h3">ประวัติการซ่อม</Typography>
      <Typography variant="h6" color="grey">
        ประวัติการซ่อม
      </Typography>
    </>
  );
};

export default InstanceDeviceHistoryPage;
