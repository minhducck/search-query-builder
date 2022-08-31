export interface FilterType<T> {
  field?: string;
  value: any;
  operation: T;
}
