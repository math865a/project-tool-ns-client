export function hexToRGBArray(color: string) {
  if (color.charAt(0) === '#') {
    color = color.substring(1, color.length);
  }
  if (color.length === 3) {
    color = color.charAt(0)
            + color.charAt(0)
            + color.charAt(1)
            + color.charAt(1)
            + color.charAt(2)
            + color.charAt(2);
  } else if (color.length !== 6) {
    color = 'ffffff';
  }
  const rgb: number[] = [];
  for (let i = 0; i <= 2; i++) {
    rgb[i] = parseInt(color.substr(i * 2, 2), 16);
  }
  return rgb;
}
