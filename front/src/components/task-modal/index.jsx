import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import MultipleSelectCheckmarks from '../multi-select';
import { statuses, taskCategories } from '../../utils/constants';

const ArtCraftIcon = () => (
  <Box
    sx={{
      width: '80px',
      height: '80px',
      minWidth: '80px',
      minHeight: '80px',
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
    <img src="/k.png" alt="k" style={{ width: '36px', height: '36px' }} />
  </Box>
);

const TaskDetailsModal = ({ task, open, onClose, onSave, onDelete }) => {
  console.log(task)
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.category);
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status);
  const [endDate, setEndDate] = useState(dayjs(task?.endDate));

  useEffect(() => {
    if (task) {
      setTitle(task.category);
      setDescription(task.description || '');
      setStatus(task.status);
      setEndDate(dayjs(task.endDate));
    }
  }, [task]);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: save logic
    const updatedTask = {
      id: task.id,
      category: title,
      description: description,
      status: status,
      endDate: endDate.toISOString(),
    };
    return onSave(updatedTask);
  };

  function calcelEdit() {
    setTitle(task.category);
    setDescription(task.description);
    setStatus(task.status);
    setEndDate(dayjs(task.endDate));
    setIsEditing(false);
  }

  if (task === null) {
    return null; // or some loading state
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { borderRadius: '15px' } }}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Task Details</Typography>
          <Box display="flex" gap={1}>
            {isEditing ? (
              <Button
                variant="contained"
                onClick={calcelEdit}
                startIcon={<CloseIcon />}
                color='warning'
              // sx={{ backgroundColor: '#FFF3D4', color: '#E0A200', '&:hover': { backgroundColor: '#FFE9B3' } }}
              >
                Cancel Edit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                startIcon={<EditIcon />}
                sx={{ backgroundColor: '#FFF3D4', color: '#E0A200', '&:hover': { backgroundColor: '#FFE9B3' } }}
              >
                Edit Task
              </Button>
            )}
            <Button variant="contained" onClick={onClose} sx={{ backgroundColor: '#63E6BE' }}>
              Back
            </Button>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 4 }}>
        <Box display="flex" gap={3} mb={3}>
          <ArtCraftIcon />
          <Box flex={1}>
            {isEditing ? (
              <MultipleSelectCheckmarks
                key={1}
                label='Select Task Category'
                options={taskCategories}
                initialValue={task.category}
                onChange={(value) => { setTitle(value) }}
              />
            ) : (
              <Typography variant="h5" fontWeight="bold">
                {taskCategories.find(cat => cat.value === title)?.label}
              </Typography>
            )}

            {isEditing ? (
              <TextField
                variant="standard"
                label="Description"
                fullWidth
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mt: 2 }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary" mt={1}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Box>
            <Typography fontWeight="bold" mb={0.5}>
              End Date
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarTodayIcon fontSize="small" />
              {isEditing ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate}
                    onChange={(newVal) => setEndDate(newVal)}
                    format="dddd, MMMM D - YYYY"
                  />
                </LocalizationProvider>
              ) : (
                <Typography>{dayjs(endDate).format('dddd, MMMM D - YYYY')}</Typography>
              )}
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Box>
            <Typography fontWeight="bold" mb={0.5}>
              {isEditing ? 'Change Status' : ''}
            </Typography>
            {isEditing ? (
              <FormControl fullWidth>
                <MultipleSelectCheckmarks
                  key={2}
                  label='Status'
                  options={statuses}
                  initialValue={statuses[0].value}
                  onChange={(value) => { setStatus(value) }}
                />
              </FormControl>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <FiberManualRecordIcon sx={{ color: '#F4A51C', fontSize: 14 }} />
                <Typography color="#F4A51C" fontWeight="medium">
                  {statuses.find((s) => s.value === status)?.label || 'Unknown Status'}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={5}>
          <Button
            onClick={() => onDelete()}
            variant="contained"
            sx={{
              bgcolor: '#FFE9E6',
              color: '#FF4C24',
              '&:hover': { bgcolor: '#FFD7D2' },
            }}
          >
            Delete Task
          </Button>

          {isEditing && (
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ width: '150px' }}>
              Submit
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
