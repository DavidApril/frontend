export interface IHttpPaginatedResponse<T> {
	data: T;
	meta: { page: number; lastPage: number; total: number };
}
