export interface IUser {
	id: string;
	name: string;
	email: string;
	created_at: Date;
	updated_at: Date;
}

export interface ICreateUser {
	name: string;
	email: string;
	password: string;
}
