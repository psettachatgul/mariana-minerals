'use client';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import locale from '../../../../../_locale/en-US';
import Example from '../Example';

const Home = () => {

  return (
    <Stack>
      <Box><Example /></Box>
      <Typography>{locale.home.placeholder}</Typography>
    </Stack>
  );
};

export default Home;
