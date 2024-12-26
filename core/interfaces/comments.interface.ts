export interface IComment {
	_id: string;
	resource_id: string;
	author_id: string;
	content: string;
}

export interface ICreateComment {
	author_id: string;
	content: string;
	resource_id: string;
}
