import * as _ from "lodash";

export interface IPoint {
  x: number;
  y: number;
}

export interface IGridspan {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export const addPoints = (vectors: IPoint[]) => {
  const x = vectors.map((d) => d.x).reduce((a, b) => a + b);
  const y = vectors.map((d) => d.y).reduce((a, b) => a + b);
  return { x, y };
};

export const ratioTwoPoints = (upper: IPoint, lower: IPoint): IPoint => ({
  x: Math.round(upper.x / lower.x),
  y: Math.round(upper.y / lower.y),
});

export const subtractTwoPoints = (
  f: IPoint,
  i: IPoint,
  round?: boolean
): IPoint => {
  if (round) {
    return { x: Math.round(f.x - i.x), y: Math.round(f.y - i.y) };
  }
  return { x: f.x - i.x, y: f.y - i.y };
};

export const multiplyTwoPoints = (v1: IPoint, v2: IPoint): IPoint => ({
  x: v1.x * v2.x,
  y: v1.y * v2.y,
});

export const distanceTwoPoints = (p1: IPoint, p2: IPoint): number =>
  vectorLength(subtractTwoPoints(p2, p1));

export const scalePoint = (v: IPoint, scalar: number) => ({
  x: v.x * scalar,
  y: v.y * scalar,
});

export const invertPoint = (p: IPoint) => ({ x: p.y, y: p.x });

export const absolutePoint = (p: IPoint) => ({
  x: Math.abs(p.x),
  y: Math.abs(p.y),
});

export const splitPoint = (p: IPoint) => [
  { x: p.x, y: 0 },
  { x: 0, y: p.y },
];

export const moveToPoint = (el: HTMLDivElement, p: IPoint) => {
  el.style.transform = `translate( 
        ${p.x}
    px, ${p.y}px)`;
};

export const roundPoint = (p: IPoint, decimals: number = 0) => ({
  x: _.round(p.x, decimals),
  y: _.round(p.y, decimals),
});

export const normalizeNumber = (n: number) => n / Math.abs(n);

export const getRect = (p: IPoint, d: IPoint): IGridspan => ({
  x1: p.x,
  x2: p.x + d.x - 1,
  y1: p.y,
  y2: p.y + d.y - 1,
});

export const normalizeRange = (data: number[]) => {
  const min = _.min(data) as number;
  const max = _.max(data) as number;
  const range = max - min;
  return data.map((d) => (d - min) / range);
};

export const normalizePoints = (points: IPoint[]) => {
  const coordinateData = _.unzip(_.map(points, (d) => [d.x, d.y]));
  const xDataNorm = normalizeRange(coordinateData[0]);
  const yDataNorm = normalizeRange(coordinateData[1]);
  const zipped = _.zip(xDataNorm, yDataNorm);
  return zipped.map((d) => ({ x: d[0], y: [1] }));
};

export const normalizeRect = (points: IGridspan[]) => {
  const coordinateData = _.unzip(
    _.map(points, (d) => [
      [d.x1, d.x2],
      [d.y1, d.y2],
    ])
  );
  const xDataNorm = normalizeRange(coordinateData[0].flat());
  const yDataNorm = normalizeRange(coordinateData[1].flat());
  const zipped = _.zip(xDataNorm, yDataNorm);
  return zipped.map((d) => ({ x1: d[0], y: [1] }));
};

export const extendAboveZero = (data: number[]) => {
  if (data.some((d) => d < 0)) {
    return _.min(data);
  }
  return 0;
};

export const isInBounds = (b: IGridspan, s: IGridspan) => {
  const extender = _.min([..._.values(b), ..._.values(s)]) as number;
  if (extender < 0) {
    b = _.mapValues(b, (v) => v - extender);
    s = _.mapValues(b, (v) => v - extender);
  }
  const x = b.x1 <= s.x1 && b.x2 >= s.x2;
  const y = b.y1 <= s.y1 && b.y2 >= s.y2;
  if (x && y) {
    return true;
  }
  return false;
};

export function isColliding(a: IGridspan, b: IGridspan) {
  return a.x1 <= b.x2 && b.x1 <= a.x2 && a.y1 <= b.y2 && b.y1 <= a.y2;
}

export const addVectors = (v1: IPoint, v2: IPoint) => ({
  x: v2.x + v1.x,
  y: v2.y + v1.y,
});

export const vectorLength = (vec: IPoint) =>
  Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));

export const getRectCoordinates = (element: HTMLDivElement | HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return { x: rect.x, y: rect.y };
};

export function preciseRound(num: number) {
  return +(Math.round(num + 1e5) * 1e-5);
}

export function unitVector(vec: IPoint) {
  return {
    x: vec.x === 0 ? 0 : vec.x / Math.abs(vec.x),
    y: vec.y === 0 ? 0 : vec.y / Math.abs(vec.y),
  };
}
