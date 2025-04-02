export type SortMode = 'ASC' | 'DESC';

export type SortOptions<T extends object> = [keyof T, SortMode][];

export type DeleteMode = 'SOFT' | 'HARD';

export interface GetAllResult<T extends object> {
  data: T[];
}

export interface CreateResult<T extends object> {
  message: string;
  data: T;
}

export interface UpdateResult<T extends object> extends CreateResult<T> {}

export interface DeleteResult {
  message: string;
}
