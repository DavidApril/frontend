export interface IProject {
	id: string;
	name: string;
	description: string;
	owner: string;
	created_at: Date;
	updated_at: Date;
}

export interface ICreateProject {
	name: string;
	description: string;
	owner: string;
}

export interface OProject extends IProject {}
