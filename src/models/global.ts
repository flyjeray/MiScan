export type PassedState<T> = {
  value: T;
  update: (val: T) => void;
};
