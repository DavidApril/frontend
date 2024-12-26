import { AxiosInstance } from 'axios';
import { IComment, ICreateComment, IHttpPaginatedResponse, IProject } from '@/core/interfaces';
import { inlazeAPI } from '@/core/api';

export class CommentsService {
	static readonly API: AxiosInstance = inlazeAPI;
	static readonly prefix: string = '/comments';

	static readonly getComments = async (resource_id: string): Promise<IHttpPaginatedResponse<IComment[]>> => {
		try {
			const { data: response } = await this.API.get(this.prefix + `?page=1&limit=10&resource_id=${resource_id}`);
			return response;
		} catch (error) {
			console.error(error);
			return { data: [], meta: { page: 0, lastPage: 0, total: 0 } };
		}
	};

	static readonly createComment = async (createComment: ICreateComment): Promise<IProject> => {
		const { data: response } = await this.API.post(this.prefix + '/create', createComment);
		return response;
	};
}
