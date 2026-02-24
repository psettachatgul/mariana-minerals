'use client';

import { Button } from '@mui/material';
import { useExampleHook } from './useExampleHook';

const Example = () => {
  const { setParam1 } = useExampleHook();

  const handleButtonClick = () => {
    setParam1(99999);
  };

  return (
    <Button variant="contained" onClick={handleButtonClick}>
      Example
    </Button>
  );
};

export default Example;
