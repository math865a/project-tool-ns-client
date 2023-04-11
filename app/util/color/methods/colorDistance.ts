import { IRGB } from '..';

export function calcColorDistance(c1: IRGB, c2: IRGB) {
  const x = Math.pow(c1.r - c2.r, 2)
        + Math.pow(c1.b - c2.b, 2)
        + Math.pow(c1.g - c2.g, 2);
  return Math.sqrt(x);
}
