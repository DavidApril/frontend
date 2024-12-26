import { AxiosInstance } from 'axios';
import { ICreateTeam, IHttpPaginatedResponse, ITeam, IUser } from '@/core/interfaces';
import { inlazeAPI } from '@/core/api';

export class UsersService {
	static readonly API: AxiosInstance = inlazeAPI;
	static readonly prefix: string = '/user';

	static readonly getUser = async (id_user: string): Promise<IUser> => {
		const { data: response } = await this.API.get(this.prefix + '/' + id_user);
		return response;
	};

	static readonly getUsers = async (id_project: string): Promise<IHttpPaginatedResponse<IUser[]>> => {
		const { data: response } = await this.API.get(this.prefix + '/' + id_project);
		return response;
	};
}
