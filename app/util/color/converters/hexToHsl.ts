import { IHSL } from '..';

export function hexToHsl(hex: string): IHSL {
  hex = hex.replace(/#/g, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((hex) => hex + hex)
      .join('');
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(
    hex,
  );
  if (!result) {
    return {
      h: 0,
      s: 0,
      l: 0,
    };
  }

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h: number = (max + min) / 2;
  let s: number = (max + min) / 2;
  let l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  s *= 100;
  s = Math.round(s);
  l *= 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return {
    h,
    s,
    l,
  };
}
