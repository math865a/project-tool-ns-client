export interface IHSL {
  h: number;
  s: number;
  l: number;
}

export type IRGB = {
  r: number;
  g: number;
  b: number;
};

export type colors = { [key: string]: string };

export interface IColor {
  name: string;
  backgroundColor: string;
  color: string;
}

export interface IColorCluster {
  name: string;
  leadColor: [number, number, number];
  colors: IColor[];
}

export interface IColorSamples {
  [name: string]: string;
}
