import { getContrastRatio, RGB } from 'a11y-contrast-color';

const colors =  ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'];

export function getColors(backgroundColor: RGB) {
  return colors.filter(color => getContrastRatio(backgroundColor, hex2Rgb(color)) > 4.5)
}

function hex2Rgb(hex: string): RGB {
  hex = hex.replace(/^#/, "").toUpperCase();
  let alpha = 255;

  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16);
    hex = hex.substring(0, 6);
  }

  if (hex.length === 4) {
    alpha = parseInt(hex.slice(3, 4).repeat(2), 16);
    hex = hex.substring(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const num = parseInt(hex, 16);
  const red = num >> 16;
  const green = (num >> 8) & 255;
  const blue = num & 255;

  return [red, green, blue];
}
