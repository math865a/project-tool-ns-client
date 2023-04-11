import { IHSL } from '..';

export function rgbToHsl(rgb: [number, number, number]): IHSL {
  const red = rgb[0] < 0 ? 0 : rgb[0] > 255 ? 255 : rgb[0];
  const green = rgb[1] < 0 ? 0 : rgb[1] > 255 ? 255 : rgb[1];
  const blue = rgb[2] < 0 ? 0 : rgb[2] > 255 ? 255 : rgb[2];

  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h: number;
  let s: number;
  let l: number;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) h += 360;
  l = (min + max) / 2;
  if (max === min) s = 0;
  else if (l <= 0.5) s = delta / (max + min);
  else s = delta / (2 - max - min);
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
