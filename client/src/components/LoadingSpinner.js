import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 14}}>
      <CircularProgress size='4rem' thickness={1.5} sx={{color: "#4D81B7"}} />
    </Box>
  );
}