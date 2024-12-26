import { AxiosInstance } from 'axios';
import { ICreateTask, IHttpPaginatedResponse, ITask, IUpdateTask } from '@/core/interfaces';
import { inlazeAPI } from '@/core/api';

export class TasksService {
	static readonly API: AxiosInstance = inlazeAPI;
	static readonly prefix: string = '/tasks';

	static readonly getTask = async (searching_term: string): Promise<ITask> => {
		const { data: response } = await this.API.get(this.prefix + '/' + searching_term);
		return response;
	};

	static readonly getTasks = async (project_id?: string): Promise<IHttpPaginatedResponse<ITask[]>> => {
		const endpoint = `${this.prefix}/${project_id || ''}`;
		const { data: response } = await this.API.get(endpoint);
		return response;
	};

	static readonly createTask = async (task: ICreateTask): Promise<ITask> => {
		const { data: response } = await this.API.post(this.prefix + '/create', task);
		return response;
	};

	static readonly deleteTask = async (task_id: string): Promise<ITask> => {
		const { data: response } = await this.API.delete(this.prefix + '/' + task_id);
		return response;
	};

	static readonly updateTask = async (task: IUpdateTask): Promise<ITask> => {
		const { data: response } = await this.API.patch(this.prefix, task);
		return response;
	};
}
