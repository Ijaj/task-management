import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const DeleteConfirmationModal = ({ open, onClose, onDelete, taskName }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(); // Your API handler function
      setIsDeleted(true);
      // Auto close after 2 seconds
      setTimeout(() => {
        setIsDeleted(false);
        setIsDeleting(false);
        onClose();
      }, 2000);
    } catch (error) {
      setIsDeleting(false);
      // Handle error as needed
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setIsDeleted(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        zIndex: 1400, // Higher z-index to appear above other modals
        '& .MuiDialog-paper': {
          borderRadius: 3,
          padding: 2
        }
      }}
    >
      {!isDeleted ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
              disabled={isDeleting}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <DialogContent sx={{ textAlign: 'center', pt: 0 }}>
            <Box sx={{ mb: 3 }}>
              {/* Illustration placeholder - you can replace with actual illustration */}
              <Box
                sx={{
                  width: 200,
                  height: 150,
                  backgroundColor: '#E8F5E8',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 2,
                  position: 'relative'
                }}
              >
                {/* Simple illustration representation */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#FFA726',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <DeleteIcon sx={{ color: 'white', fontSize: 24 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      width: 20,
                      height: 20,
                      backgroundColor: '#424242',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CloseIcon sx={{ color: 'white', fontSize: 12 }} />
                  </Box>
                </Box>
                {/* Papers flying effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 30,
                    width: 20,
                    height: 25,
                    backgroundColor: 'white',
                    borderRadius: 0.5,
                    transform: 'rotate(15deg)',
                    boxShadow: 1
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 30,
                    right: 50,
                    width: 20,
                    height: 25,
                    backgroundColor: 'white',
                    borderRadius: 0.5,
                    transform: 'rotate(-10deg)',
                    boxShadow: 1
                  }}
                />
              </Box>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Are you Sure!!
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Do you want to delete this Task on this app?
            </Typography>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleConfirm}
              disabled={isDeleting}
              sx={{
                minWidth: 100,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              {isDeleting ? 'Deleting...' : 'Yes'}
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              disabled={isDeleting}
              sx={{
                minWidth: 100,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              No
            </Button>
          </DialogActions>
        </>
      ) : (
        <DialogContent sx={{ textAlign: 'center', py: 6 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: 'success.main',
              mb: 2
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.main' }}>
            Task has been deleted
          </Typography>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DeleteConfirmationModal;