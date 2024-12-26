export interface ISignin {
	email: string;
	password: string;
}

export interface OSignin {
	user: {
		id: string;
		name: string;
		email: string;
		roles: string[];
	};
	token: string;
}

export interface OUser {
	id: string;
	name: string;
	email: string;
	is_active: boolean;
	roles: string[];
	teamId: string | null;
	created_at: string;
	updated_at: string;
}
