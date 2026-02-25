import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';
import { TProject } from '../../../../../_schemas/mariana';

interface PropTypes {
  project: TProject;
}

const ProjectAccordion = ({ project }: PropTypes) => {
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A';
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {project.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Task Count
              </Typography>
              <Typography variant="body2">{project.taskCount}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Duration (Days)
              </Typography>
              <Typography variant="body2">
                {project.durationDays ?? 'N/A'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Earliest Start Date
              </Typography>
              <Typography variant="body2">
                {formatDate(project.earliestStartDate)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Latest End Date
              </Typography>
              <Typography variant="body2">
                {formatDate(project.latestEndDate)}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="small"
              component={Link}
              href={`/projects/${project.id}/tasks`}
            >
              View Tasks
            </Button>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectAccordion;
