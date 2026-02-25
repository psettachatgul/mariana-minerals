'use client';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import ProjectAccordion from './_components/project';
import { useProjects } from './useProjects';

const ProjectsPage = () => {
  const { projects, isProjectsLoading } = useProjects();

  if (isProjectsLoading) {
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

  if (!projects || projects.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="textSecondary">No projects found</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      {projects.map((project) => (
        <ProjectAccordion key={project.id} project={project} />
      ))}
    </Stack>
  );
};

export default ProjectsPage;
