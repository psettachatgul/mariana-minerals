'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface ExampleResponse {
  data: unknown;
}

export const useExampleHook = () => {
  const [param1, setParam1] = useState<number | undefined>(undefined);

  // example for a get request
  const { data: responseGet } = useQuery({
    queryKey: ['example', 'GET', param1],
    queryFn: async (): Promise<ExampleResponse> => {
      const response = await axios.get('/api/example', {
        params: {
          param1,
        },
      });
      return response.data;
    },
    enabled: param1 !== undefined,
  });

  // example for a post request
  const { data: responsePost } = useQuery({
    queryKey: ['example', 'POST', param1],
    queryFn: async (): Promise<ExampleResponse> => {
      const response = await axios.post(
        '/api/example',
        { param1 },
      );
      return response.data;
    },
    enabled: param1 !== undefined,
  });

  return {
    setParam1,
    responseGet,
    responsePost,
  };
};
