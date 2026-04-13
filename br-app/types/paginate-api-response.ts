export interface PaginateApiResponse<T> {
  data?: T;
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  }
}