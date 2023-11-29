export type PassedState<T> = {
  value: T;
  update: (val: T) => void;
};

export type PaginationRequestLinks = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

export type PaginationRequestMetaData = {
  current_page: number;
  last_page: number;
  path: string;
  per_page: number;
  total: number;
};
