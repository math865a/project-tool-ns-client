import { hexToRGBArray } from '.';

export function luma(color: string) {
  const rgb = typeof color === 'string' ? hexToRGBArray(color) : color;
  if (rgb === null) return 165;
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // SMPTE C, Rec. 709 weightings
}
