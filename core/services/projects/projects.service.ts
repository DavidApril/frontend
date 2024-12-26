import { AxiosInstance } from 'axios';
import { ICreateProject, IHttpPaginatedResponse, IProject } from '@/core/interfaces';
import { inlazeAPI } from '@/core/api';

export class ProjectsService {
	static readonly API: AxiosInstance = inlazeAPI;
	static readonly prefix: string = '/projects';

	static readonly getProject = async (searching_term: string): Promise<IProject> => {
		const { data: response } = await this.API.get(this.prefix + '/' + searching_term);
		return response;
	};

	static readonly getProjects = async (): Promise<IHttpPaginatedResponse<IProject[]>> => {
		try {
			const { data: response } = await this.API.get(this.prefix);
			return response;
		} catch (error) {
			console.error(error);
			return { data: [], meta: { page: 0, lastPage: 0, total: 0 } };
		}
	};

	static readonly createProject = async (project: ICreateProject): Promise<IProject> => {
		const { data: response } = await this.API.post(this.prefix + '/create', project);
		return response;
	};
}
