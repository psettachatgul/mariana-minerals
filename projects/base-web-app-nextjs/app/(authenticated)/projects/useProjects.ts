import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ZProject } from '../../../_schemas/mariana';

export const useProjects = () => {

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {

      console.log('************* process.env.MARIANA_SERVICE_BASE_URL, ', process.env.MARIANA_SERVICE_BASE_URL);

      const { data: projectsResponse } = await axios.get(
        `${process.env.NEXT_PUBLIC_MARIANA_SERVICE_BASE_URL}/projects`,
      );

      return ZProject.array().parse(projectsResponse);
    },
  });

  return {
    projects,
    isProjectsLoading,
  };
};
