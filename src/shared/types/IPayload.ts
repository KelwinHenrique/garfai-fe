export interface IPayload<T> {
  count: number;
  rows: T[];
}