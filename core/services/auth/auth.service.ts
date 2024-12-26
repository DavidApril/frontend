import { inlazeAPI } from '@/core/api';
import { AxiosInstance } from 'axios';
import { ISignin, OSignin, OUser } from '../../interfaces/auth.interface';

export class AuthService {
	static readonly API: AxiosInstance = inlazeAPI;
	static readonly prefix: string = '/auth';

	static readonly signin = async (credentials: ISignin): Promise<OSignin> => {
		const { data: response } = await this.API.post(this.prefix + '/login', credentials);
		return response;
	};

	static readonly signup = async (credentials: ISignin): Promise<OSignin> => {
		const { data: response } = await this.API.post(this.prefix + '/register', credentials);
		return response;
	};

	static readonly getUser = async (id: string): Promise<OUser> => {
		const { data: response } = await this.API.get('user/' + id);
		return response;
	};

	static readonly getUsers = async (): Promise<{ users: OUser[]; meta: any }> => {
		const { data: response } = await this.API.get('user/find_all');
		return { users: response.data, meta: response.meta };
	};
}
