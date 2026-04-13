export class PaginateResponseDto<T> {
  data?: T;
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  }

  constructor(data?: T, page: number = 1, limit: number = 10, totalItems: number = 0) {
    this.data = data;
    this.meta = {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    };
  }
}