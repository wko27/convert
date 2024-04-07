import * as _ from 'lodash';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function DisplayView(props) {
  const {
    inputType,
  } = props;

  return (
    <Box
      sx={{
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>
        {inputType}
      </Typography>
    </Box>
  );
}