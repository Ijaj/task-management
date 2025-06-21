import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Task() {
  const { tid } = useParams();
  if (!tid) {
    return <Box>Task ID is required</Box>;
  }
  return (
    <Box>Task# {tid}</Box>
  );
}