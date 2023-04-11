import _ from "lodash";
import { Duration as dur } from "luxon";
import v from "voca";
import {format} from "d3-format"

export function getHours(millis: number = 0) {
  return round(dur.fromMillis(millis).shiftTo("hours").hours ?? 0);
}

export function round(num: number, decimals: number = 2) {
  const fac = 10 * decimals;
  return Math.round(num * fac) / fac;
}

export function suffix(value: any, prefix: string = "kr") {
  return `${value}${prefix}`;
}

export function formatThousands(number: number) {
    return format(",")(number).replace(",", ".");
}

export function formatDecimal(number: number) {
  return String(number).replace(".", ",");
}
export function compressAmount(number: number) {
  if (number > 1000) {
    return suffix(formatDecimal(_.round(number / 1000, 1)), "k");
  }
  return suffix(formatThousands(number), "kr.");
}

export function inThousands(number: number) {
  return formatDecimal(_.round(number / 1000, 1));
}

export function getAvatarName(name: string) {
  const split = v.split(name, " ");
  if (split.length === 1) {
    return v.upperCase(v.substr(name, 0, 2));
  }
  if (split.length > 2) {
    const last = split[split.length - 1];
    return v.upperCase(name[0] + last[0]);
  }
  return v.upperCase(name[0] + split[1][0]);
}

export function getFullName(obj: { firstName: string; lastName: string }) {
  return `${obj.firstName} ${obj.lastName}`;
}
