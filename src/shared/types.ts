export type noneFn = () => void;

export type RectangularCoordinatesType = {
  x: number;
  y: number;
};

export type AbstractFieldsType = {
  [key: string]: unknown;
};

export type ArrayElement<T> = T extends (infer U)[] ? U : never;
