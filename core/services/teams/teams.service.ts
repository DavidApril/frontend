import { AxiosInstance } from 'axios';
import { ICreateTeam, ITeam } from '@/core/interfaces';
import { inlazeAPI } from '@/core/api';

export class TeamsService {
	static readonly API: AxiosInstance = inlazeAPI;
	static readonly prefix: string = '/teams';

	static readonly getTeam = async (id_project: string): Promise<ITeam> => {
		const { data: response } = await this.API.get(this.prefix + '/' + id_project);
		return response;
	};

	static readonly createTeam = async (team: ICreateTeam): Promise<ITeam> => {
		const { data: response } = await this.API.post(this.prefix + '/create', team);
		return response;
	};
}
