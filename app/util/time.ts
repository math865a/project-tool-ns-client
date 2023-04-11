import _ from 'lodash';
import {
  DateObjectUnits, DateTime as dt, Duration, DurationLike, Interval as int,
} from 'luxon';

type DateFormat = dt | string | number;

export function normalize(d: DateFormat, hour: number = 8) {
  if (typeof d === 'string' || typeof d === 'number') {
    d = getDateTime(d);
  }
  return dt.fromObject({
    day: d.day,
    month: d.month,
    year: d.year,
    hour,
    minute: 0,
    second: 0,
    millisecond: 0,
  }, { zone: 'utc' });
}

export function getDateTime(date: string | number | Date | dt): dt {
  if (typeof date === 'string') {
    return dt.fromISO(date, { zone: 'utc', locale: 'da' });
  } if (typeof date === 'number') {
    return dt.fromMillis(date, { zone: 'utc', locale: 'da' });
  } if (date instanceof dt) {
    return date.setZone("utc");
  }
  return dt.fromJSDate(date);
}

export function getDatetimeFromObject(object: DateObjectUnits) {
  return dt.fromObject({...object, hour: 8, second: 0, millisecond: 0, minute: 0}).setZone("utc");
}

export function getDateObjectFromString(stringDate: string) {
  return getDateObject(dt.fromISO(stringDate).setZone("utc"));
}

export function getDateObject(date: dt) {
  return { year: date.year, month: date.month, day: date.day };
}

export function getNormalizedNow() {
  return normalize(dt.now().setZone("utc"));
}

export function getNormalizedNowPlus(duration: DurationLike) {
  return getNormalizedNow().plus(duration);
}

export function formatDate(date?: string | number | Date | dt, token = 'dd/MM/yyyy') {
  if (!date) return '-';
  return getDateTime(date).setZone("utc").toFormat(token);
}

export function getWorkDaysFromMillis(start: number, end: number) {
  const interval = int.fromDateTimes(dt.fromMillis(start, { zone: 'utc' }), dt.fromMillis(end, { zone: 'utc' }));
  return getWorkDays(interval);
}

export function getWorkDaysFromDTs(start: dt, end: dt) {
  const interval = int.fromDateTimes(start.setZone("utc"), end.setZone("utc"));
  return getWorkDays(interval);
}

export function getWorkDays(interval: int) {
  return interval.splitBy({ days: 1 }).filter((d) => ![6, 7].includes((d.start as dt).weekday)).length;
}

export function getInterval(start: number, end: number) {
  return int.fromDateTimes(dt.fromMillis(start, { zone: 'utc' }), dt.fromMillis(end, { zone: 'utc' }));
}

export function minToHours(minutes: number) {
  return Duration.fromObject({ minutes }).shiftTo('hours').hours;
}

export function hoursToMin(hours: number) {
  return Duration.fromObject({ hours }).shiftTo('minutes').minutes;
}

export function validateDuration(stringDuration: string) {
  const reg = /[0-9,]*/;
  const value = stringDuration.match(reg);
  let numericValue: number = 0;
  let stringValue: string = '0';
  if (value) {
    if (value[0] === '' || value[0] === ',') {
      numericValue = 0;
    } else {
      numericValue = Number(value[0].replace(',', '.'));
      stringValue = value[0];
    }
  } else {
    numericValue = 0;
  }
  if (numericValue < 0) {
    numericValue = 0;
  }
  return {
    numeric: numericValue,
    text: stringValue,
  };
}
