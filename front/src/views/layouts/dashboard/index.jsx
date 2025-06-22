import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Menu, MenuItem, Avatar, IconButton, Link } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useAuth } from "../../../hooks/Auth";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.endsWith("/dashboard") || location.pathname.endsWith("/dashboard/");
  const isSpin = location.pathname.endsWith("/dashboard/spin") || location.pathname.endsWith("/dashboard/spin/");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    logout();
    handleClose();
    navigate("/auth/login");
  }

  function handleResetPassword() {
    handleClose();
    navigate("/auth/reset");
  }

  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ height: isDashboard ? '306px' : '174px', position: 'relative' }}>
        <Box sx={{ width: '100%', height: '100%', px: 8, backgroundImage: 'url(/header.png)', backgroundSize: 'cover' }}>
          <Box sx={{ py: 4, marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Box display={'flex'}>
              <Box
                sx={{
                  width: '32px',
                  height: '32px',
                  p: 0.5,
                  borderRadius: '8px',
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  flexShrink: 0
                }}
              >
                <img src='/timer.png' alt='Timer Icon' style={{ width: '100%', height: '100%' }} />
              </Box>
              <Typography variant="h5" fontWeight={'bold'} sx={{ color: "#F5F5F5" }}>&nbsp;Tasks</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '50px',
                color: '#F5F5F5',
                fontWeight: 'normal'
              }}
            >
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img src="/clipboard.png" alt="Timer Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                  <Typography variant="h6" fontWeight={'normal'} color={isDashboard ? "primary" : "#F5F5F5"}>Task List</Typography>
                </Box>
              </Link>
              <Link href="/dashboard/spin" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img src="/wheel.png" alt="Timer Icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                  <Typography variant="h6" fontWeight={'normal'} color={isSpin ? "primary" : "#F5F5F5"}>Spin</Typography>
                </Box>
              </Link>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '50px',
                color: '#F5F5F5',
                fontWeight: 'normal'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar src="/avatar.png" alt="User Avatar" sx={{ width: 32, height: 32, marginRight: '10px' }} />
                <Typography variant="h6" fontWeight={'normal'}>{user?.name}</Typography>
                <IconButton
                  onClick={handleClick}
                  sx={{ color: '#F5F5F5' }}
                  id="menu-button"
                  aria-controls={open ? 'menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      'aria-labelledby': 'menu-button',
                    },
                  }}
                >
                  <MenuItem onClick={handleResetPassword}>Reset Password</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
          {isDashboard && (
            <Box sx={{ color: 'white' }}>
              <Typography variant="h5" color="primary">Hi {user?.name}</Typography>
              <Typography variant="h3" fontWeight={'bold'}>Welcome to Dashboard</Typography>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid size={{
        xs: 12, sm: 12, md: 12, lg: 12, xl: 12
      }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
