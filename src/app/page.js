"use client"; // This is a client component

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Copyright from '@/components/Copyright';
import DisplayView from '@/components/DisplayView';
import DisplayType from '@/components/DisplayType';

import { transform } from '@/logic/transform';
import { guessInputType } from '@/logic/guesser';

import * as InputType from '@/logic/inputType';

export default function Home() {
  const [output, setOutput] = useState('Output');
  const [inputType, setInputType] = useState(InputType.EMPTY);

  const handleInput = (value) => {
    const inputType = guessInputType(value);
    console.log(`Guessed ${inputType} for '${value}'`);
    setInputType(inputType);
    setOutput(transform(inputType, value));
  };

  return (
    <Container maxWidth='xl'>
      <DisplayType
        inputType={inputType}
      />
      <DisplayView
        handleInput={handleInput}
        output={output}
      />
      <Copyright />
    </Container>
  );
}
