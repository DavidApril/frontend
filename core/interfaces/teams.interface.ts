import { IUser } from './users.interfaces';

export interface ITeam {
	id: string;
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
	members: IUser[];
}

export interface ICreateTeam {
	name: string;
	description: string;
	owner: string;
	project_id: string;
	members: string[];
}
