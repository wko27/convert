"use client"; // This is a client component

import * as _ from 'lodash';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function DisplayView(props) {
  const [inputValue, setInputValue] = useState();

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
      <TextField
      fullWidth
        multiline
        rows={100}
        value={inputValue}
        onChange={(event) => props.handleInput(event.target.value)}
        placeholder='Paste here'
        InputProps={{
          style: {
            maxWidth: '100%',
          },
        }}
      />
      <TextField
        fullWidth
        multiline
        rows={100}
        value={props.output}
        disabled
        InputProps={{
          style: {
            maxWidth: '100%',
          },
        }}
      />
    </Box>
  );
}