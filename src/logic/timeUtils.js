import { DateTime } from 'luxon';

export function formatDateTime(value) {
  const x = value.toLocaleString(DateTime.DATETIME_FULL);
  console.log(value, x);
  return x;
}
