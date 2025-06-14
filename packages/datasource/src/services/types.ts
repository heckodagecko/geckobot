export type SortMode = "ASC" | "DESC";

export type SortOptions<T extends object> = [keyof T, SortMode][];

export type DeleteMode = "SOFT" | "HARD";

export interface GetAllOptions<T extends object> {
  sortBy?: SortOptions<T>;
  pageNo?: number;
  pageSize?: number;
  includeTrashed?: boolean;
}

export interface GetAllResult<T extends object> {
  data: T[];
  _paging: {
    totalCount: number;
    totalPages: number;
  };
}

export interface CreateResult<T extends object> {
  message: string;
  data: T;
}

export interface UpdateResult<T extends object> extends CreateResult<T> {}

export interface DeleteResult {
  message: string;
}

export interface RestoreResult {
  message: string;
}
