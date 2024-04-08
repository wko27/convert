import { DateTime } from 'luxon';

export function formatDateTime(value) {
  return value.toLocaleString(DateTime.DATETIME_FULL);
}
