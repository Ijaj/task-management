import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.endsWith("/dashboard") || location.pathname.endsWith("/dashboard/");
  return (
    <Box>
      DashboardLayout Page. {isDashboard ? 'true' : 'false'}
      <Outlet />
    </Box>
  );
}
