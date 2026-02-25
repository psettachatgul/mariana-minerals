'use client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TasksTable from './_components/TasksTable';
import { useTasks } from './useTasks';

const TasksPage = () => {

  const { tasks, isTasksLoading } = useTasks();

  if (isTasksLoading) {
    return (
      <Box display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (<TasksTable tasks={tasks ?? []} />);

};

export default TasksPage;
