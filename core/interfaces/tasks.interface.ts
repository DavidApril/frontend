export interface ITask {
	id: string;
	title: string;
	is_active: boolean;
	description: string;
	assignee_id: string;
	project_id: string;
	status: TaskState;
	due_date: string;
	created_at: Date;
	updated_at: Date;
}

export enum TaskState {
	TODO = 'todo',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
}

export const TaskStateList = [TaskState.TODO, TaskState.IN_PROGRESS, TaskState.COMPLETED];

export interface ICreateTask {
	title: string;
	description: string;
	due_date: string;
	status: TaskState;
	assignee_id: string;
	project_id: string;
}

export interface IUpdateTask extends Partial<ICreateTask> {
	id: string;
}
