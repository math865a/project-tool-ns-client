import _ from 'lodash';
import {
  hexToHsl,
  hexToRgb,
  sampleClusters,
  sampleColors,
  IColor,
  IColorCluster,
  IColorSamples,
  IRGB,
} from '..';
import { calcColorDistance, getContrastColor } from '.';

export function sortColors(
  colors: IColorSamples = sampleColors,
  clusters: IColorCluster[] = sampleClusters,
) {
  const groups = _.cloneDeep(clusters);

  // Assigns to a group
  _.toPairs(colors).forEach(([name, hex]) => {
    const rgb = hexToRgb(hex);
    if (rgb !== null) {
      const distances = _.map(groups, (d) => calcColorDistance(zipRGB(d.leadColor), rgb));
      const minIndex = _.indexOf(distances, _.min(distances));
      groups[minIndex].colors.push({
        name,
        backgroundColor: hex,
        color: getContrastColor(hex),
      });
    }
  });

  const sorted_colors: IColor[] = [];
  groups.forEach((group) => {
    const dim = ['white', 'grey', 'black'].includes(group.name) ? 'l' : 's';
    const hslGroup = _.map(group.colors, (d) => ({
      name: d.name,
      backgroundColor: d.backgroundColor,
      dim: hexToHsl(d.backgroundColor)[dim],
      color: d.color,
    }));
    const sorted = _.sortBy(hslGroup, (d) => d.dim);
    sorted_colors.push(
      ..._.map(sorted, (d) => ({
        name: d.name,
        backgroundColor: d.backgroundColor,
        color: d.color,
      })),
    );
  });

  return sorted_colors;
}

function zipRGB(values: number[]): IRGB {
  return _.zipObject(['r', 'g', 'b'], values) as IRGB;
}
