import * as _ from 'lodash';
import { DateTime } from 'luxon';

import * as InputType from './inputType';

const IS_NUMERIC_REGEX = /^-?[\d.]+$/;
const MAX_UPPER_EPOCH_MS = Date.now() + 20 * 365 * 24 * 60 * 60 * 1000;

function isNumeric(value) {
  return IS_NUMERIC_REGEX.test(value);
}

// Between 2000 and 20 years from now
function isEpochMs(value) {
  const x = parseInt(value, 10);
  return x > 946684800000 && x < MAX_UPPER_EPOCH_MS;
}

// Between 2000 and 20 years from now
function isEpochSeconds(value) {
  const x = parseInt(value, 10);
  return x > 946684800 && x < MAX_UPPER_EPOCH_MS / 1000;
}

function isDateTime(value) {
  console.log(DateTime.fromISO(value));
  return DateTime.fromISO(value) != null;
}

function handleDateTime(line) {
  if (isNumeric(line)) {
    if (isEpochMs(line)) {
      return InputType.EPOCH_MILLISECONDS;
    }

    if (isEpochSeconds(line)) {
      return InputType.EPOCH_SECONDS;
    }
  }

  if (DateTime.fromISO(line).isValid) {
    return InputType.ISO_8601;
  }

  if (DateTime.fromRFC2822(line).isValid) {
    return InputType.RFC_2822;
  }

  if (DateTime.fromHTTP(line).isValid) {
    return InputType.HTTP_DATE_TIME;
  }

  if (DateTime.fromSQL(line).isValid) {
    return InputType.SQL_DATE_TIME;
  }

  return InputType.UNKNOWN;
}

function guessSingleLine(line) {
  let inputType;

  if (_.isEmpty(line)) {
    return InputType.EMPTY;
  }

  inputType = handleDateTime(line);
  if (inputType !== InputType.UNKNOWN) {
    return inputType;
  }

  return InputType.UNKNOWN;
}

function guessMultiLine(lines) {
  // Guess the first three lines
  // If they don't match, then throw it away

  let inputType = undefined;

  for (let i = 0; i < Math.min(3, lines.length); i ++) {
    const line = lines[i];
    const currentInputType = guessSingleLine(line);

    if (inputType !== undefined && currentInputType !== inputType) {
      console.log(`Guessed ${inputType} and then ${currentInputType}`);
      return InputType.INCONSISTENT_LINES;
    }

    inputType = currentInputType;
  }

  return inputType;
}

export function guessInputType(value) {
  const lines = value
    .split('\n')
    .map(x => x.trim())
    .filter(x => !_.isEmpty(x));

  if (lines.length === 0) {
    return InputType.EMPTY;
  }

  if (lines.length > 1) {
    return guessMultiLine(lines);
  }
  return guessSingleLine(value);
}
