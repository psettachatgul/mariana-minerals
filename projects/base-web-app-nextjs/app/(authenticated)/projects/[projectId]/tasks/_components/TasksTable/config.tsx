import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { TTask } from '../../../../../../../_schemas/mariana';
import { ColConfig } from '../../../../../../_components/Table/types';

export const TaskTableColumns: ColConfig<TTask>[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'dependsOn',
    label: 'Dependencies',
    render: (value: unknown) => {
      return (
        <Stack>
          {(value as number[]).map((taskId) => (
            <Link key={taskId} href={`/tasks/${taskId}`}>{taskId}</Link>
          ))}
        </Stack>
      );
    },
  },
  {
    key: 'startDate',
    label: 'Start Date',
    render: (value: unknown) => {
      return (<>{format(value as Date, 'MMM dd, yyyy')}</>);
    },
  },
  {
    key: 'dueDate',
    label: 'Due Date',
    render: (value: unknown) => {
      return (<>{format(value as Date, 'MMM dd, yyyy')}</>);
    },
  },
];
