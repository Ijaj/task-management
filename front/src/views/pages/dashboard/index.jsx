import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid
} from '@mui/material';

import SingleSelect from '../../../components/multi-select';
import { taskCategories, statuses } from '../../../utils/constants';
import TaskCard from '../../../components/task-card';
import TaskDetailsModal from '../../../components/task-modal';
import DeleteConfirmationModal from '../../../components/delete-modal';
import NewTaskModal from '../../../components/new-task-model';

// dummy data
const _tasks = [
  { id: 1, category: taskCategories[0].value, description: 'Description for task 1', status: statuses[0].value, endDate: '2024-08-19' },
  { id: 2, category: taskCategories[1].value, description: 'Description for task 2', status: statuses[0].value, endDate: '2024-08-19' },
  { id: 3, category: taskCategories[1].value, description: 'Description for task 3', status: statuses[1].value, endDate: '2024-08-19' },
  { id: 4, category: taskCategories[2].value, description: 'Description for task 4', status: statuses[2].value, endDate: '2024-08-19' },
  { id: 5, category: taskCategories[2].value, description: 'Description for task 5', status: statuses[0].value, endDate: '2024-08-19' },
  { id: 6, category: taskCategories[3].value, description: 'Description for task 6', status: statuses[1].value, endDate: '2024-08-19' },
];

export default function Dashboard() {
  const dashboardAllStatus = [{ value: 'all_tasks', label: 'All Tasks' }, ...statuses];
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tasks, setTasks] = useState(_tasks);

  function openNewTaskModal() {
    setNewTaskModalOpen(true);
  }

  function closeNewTaskModal() {
    setNewTaskModalOpen(false);
  }

  function openDeleteModal() {
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }

  function openTaskDetailModal() {
    setTaskDetailModalOpen(true);
  }

  function closeTaskDetailModal() {
    setSelectedTasks(null);
    setTaskDetailModalOpen(false);
  }

  function onTaskClick(task) {
    setSelectedTasks(task);
    openTaskDetailModal();
  }

  function onTaskSave(task) {
    // Handle task save logic here
    if (task.id) {
      // Update existing task
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      // Add new task
      task.id = tasks.length + 1; // Simple ID generation
      setTasks([...tasks, task]);
    }
    console.log('Task saved:', task);
    closeNewTaskModal();
  }

  function onTaskDelete(task) {
    // Handle task delete logic here
    console.log('Task deleted');
    if (task) setSelectedTasks(task);
    openDeleteModal();
  }

  function handleDeleteConfirmation() {
    // Logic to delete the task
    console.log('Task confirmed for deletion:', selectedTasks);
    setTasks(tasks.filter(t => t.id !== selectedTasks.id));
    closeTaskDetailModal();
    closeDeleteModal();
  }

  return (
    <Box sx={{ px: 8, margin: '-50px auto auto auto', position: 'relative', zIndex: 1 }}>
      <NewTaskModal
        open={newTaskModalOpen}
        onClose={closeNewTaskModal}
        onSave={onTaskSave}
      />
      <TaskDetailsModal
        open={taskDetailModalOpen}
        onClose={closeTaskDetailModal}
        onDelete={onTaskDelete}
        onSave={onTaskSave}
        task={selectedTasks}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteConfirmation}
        taskName={taskCategories.find(cat => cat.value === selectedTasks?.category)?.label || 'Task'}
      />
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              p: 2,
            }}
          >
            <Grid container spacing={0} alignItems="center" sx={{ width: '100%' }}>
              <Grid size={{ xl: 2.4, lg: 2.4, md: 2.4, sm: 2.4, xs: 12 }}>
                <Typography variant="h5" fontWeight={'bold'}>
                  All Tasks List
                </Typography>
              </Grid>

              <Grid size={{ xl: 2.4, lg: 2.4, md: 2.4, sm: 2.4, xs: 12 }} />

              <Grid size={{ xl: 2.4, lg: 2.4, md: 2.4, sm: 2.4, xs: 12 }}>
                <SingleSelect
                  key={1}
                  label='Select Task Category'
                  options={taskCategories}
                  onChange={(values) => { console.log(values) }}
                />
              </Grid>

              <Grid size={{ xl: 2.4, lg: 2.4, md: 2.4, sm: 2.4, xs: 12 }}>
                <SingleSelect
                  key={2}
                  label='Status'
                  options={dashboardAllStatus}
                  initialValue={dashboardAllStatus[0].value}
                  onChange={(values) => { console.log(values) }}
                />
              </Grid>

              <Grid size={{ xl: 2.4, lg: 2.4, md: 2.4, sm: 2.4, xs: 12 }}>
                <Button onClick={openNewTaskModal} variant='contained' color='primary' size='large' fullWidth sx={{ height: '56px' }}>
                  <img src='/new-task.png' alt='new task icon' style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                  Add New Task
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {tasks.map((task) => (
              <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
                <TaskCard key={task.id} task={task} onClick={onTaskClick} onDelete={() => onTaskDelete(task)} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

