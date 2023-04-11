import { luma } from '..';

export function getContrastColor(color: string) {
  return luma(color) >= 165 ? '#000000' : '#ffffff';
}
