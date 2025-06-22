import React, { useState } from 'react';
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
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

const NewTaskModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null);
  const [endDate, setEndDate] = useState(dayjs());

  const handleSave = () => {
    if (!title || !description || !status || !endDate) {
      alert('Please fill in all fields');
      return;
    }
    const updatedTask = {
      category: title,
      description: description,
      status: status,
      endDate: endDate.toISOString(),
    };
    return onSave(updatedTask);
  };

  function handleClose() {
    setTitle(null);
    setDescription('');
    setStatus(null);
    setEndDate(dayjs());
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { borderRadius: '15px' } }}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Task Details</Typography>
          <Box display="flex" gap={1}>
            <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: '#63E6BE' }}>
              Back
            </Button>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 4 }}>
        <Box display="flex" gap={3} mb={3} component={'form'} onSubmit={handleSave}>
          <ArtCraftIcon />
          <Box flex={1}>
            <MultipleSelectCheckmarks
              key={1}
              label='Select Task Category'
              options={taskCategories}
              onChange={(value) => { setTitle(value) }}
              required
            />

            <TextField
              variant="standard"
              label="Description"
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 2 }}
              required
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Box>
            <Typography fontWeight="bold" mb={0.5}>
              End Date
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarTodayIcon fontSize="small" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={endDate}
                  onChange={(newVal) => setEndDate(newVal)}
                  format="dddd, MMMM D - YYYY"
                />
              </LocalizationProvider>
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Box>
            <Typography fontWeight="bold" mb={0.5}>
              Status
            </Typography>
            <FormControl fullWidth>
              <MultipleSelectCheckmarks
                key={2}
                label='Status'
                options={statuses}
                initialValue={statuses[0].value}
                onChange={(value) => { setStatus(value) }}
              />
            </FormControl>
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={5}>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ width: '150px' }}>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
