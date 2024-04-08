import * as _ from 'lodash';

import { DateTime } from 'luxon';

import * as InputType from './inputType';

import { guessInputType } from './guesser';

import * as TimeUtils from './timeUtils'

export function transformSingleLine(inputType, value) {
  switch (inputType) {
  case InputType.EPOCH_MILLISECONDS:
    return TimeUtils.formatDateTime(DateTime.fromMillis(parseInt(value, 10)));
  case InputType.EPOCH_SECONDS:
    return TimeUtils.formatDateTime(DateTime.fromSeconds(parseInt(value)));
  case InputType.ISO_8601:
    return TimeUtils.formatDateTime(DateTime.fromISO(value));
  case InputType.RFC_2822:
    return TimeUtils.formatDateTime(DateTime.fromRFC2822(value));
  case InputType.HTTP_DATE_TIME:
    return TimeUtils.formatDateTime(DateTime.fromHTTP(value));
  case InputType.SQL_DATE_TIME:
    return TimeUtils.formatDateTime(DateTime.fromSQL(value));

  case InputType.EMPTY:
    return "Output"
  case InputType.UNKNOWN:
    return "Unknown";
  case InputType.INCONSISTENT_LINES:
    return "Inconsistent Lines";
  }
}
export function transform(inputType, value) {
  const lines = value.split('\n');

  const output = [];
  for (const line of lines) {
    if (_.isEmpty(line.trim())) {
      output.push("");
    } else {
      output.push(transformSingleLine(inputType, line.trim()));
    }
  }

  return output.join('\n');
}
