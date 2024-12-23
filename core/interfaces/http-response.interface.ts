export interface IHttpResponse<T> {
	data: T;
	meta: { page: number; lastPage: number; total: number };
}
