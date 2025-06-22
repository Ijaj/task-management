import React from 'react';
import {
  Card,
  Typography,
  IconButton,
  Box,
  Stack,
  ButtonBase,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { statuses, taskCategories } from '../../utils/constants';
import dayjs from 'dayjs';

const ArtCraftIcon = () => (
  <Box
    sx={{
      width: '56px',
      height: '56px',
      minWidth: '56px',
      minHeight: '56px',
      background: 'url(/circle.png) no-repeat center center',
      backgroundSize: 'cover',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}
  >
    <img src="/k.png" alt="k" style={{ width: '24px', height: '24px' }} />
  </Box>
);

const TaskCard = ({ task = null, onClick, onDelete }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: 2,
        width: '100%',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 3,
          cursor: 'pointer',
        },
      }}
      onClick={() => onClick(task)}
    >
      <Box display="flex" justifyContent="space-between" alignItems="start">
        <Stack direction="row" spacing={2}>
          <ArtCraftIcon />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {taskCategories.find(cat => cat.value === task?.category)?.label || 'Unknown Category'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task?.description}.
            </Typography>
          </Box>
        </Stack>

        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click when trash is clicked
            onDelete(task);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon fontSize="small" />
          <Typography variant="body2">
            {dayjs(task?.endDate).format('dddd, MMMM D - YYYY')}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <FiberManualRecordIcon sx={{ color: '#E057FF', fontSize: 12 }} />
          <Typography variant="body2" color="#E057FF" fontWeight="medium">
            {statuses.find((s) => s.value === task?.status)?.label || 'Unknown Status'}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default TaskCard;
