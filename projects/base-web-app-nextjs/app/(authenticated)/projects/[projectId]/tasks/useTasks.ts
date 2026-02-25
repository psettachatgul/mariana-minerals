'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ZTask } from '../../../../../_schemas/mariana';

export const useTasks = () => {

  const { projectId } = useParams();

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {

      const { data: tasksResponse } = await axios.get(
        `${process.env.NEXT_PUBLIC_MARIANA_SERVICE_BASE_URL}/projects/${projectId}/tasks`,
      );

      return ZTask.array().parse(tasksResponse);
    },
  });

  return {
    tasks,
    isTasksLoading,
  };
};
