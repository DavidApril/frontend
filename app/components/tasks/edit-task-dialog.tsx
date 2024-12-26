'use client';

import {
	Button,
	Dialog,
	DialogTitle,
	DialogDescription,
	DialogBody,
	DialogActions,
	Field,
	Label,
	Input,
	Alert,
	DatePicker,
	Divider,
	Select,
	Textarea,
	Strong,
	AlertActions,
	AlertDescription,
	AlertDialog,
	AlertTitle,
} from '@/core/components';
import { ITask, IUser, OProject, OUser, TaskState, TaskStateList } from '@/core/interfaces';
import { ProjectsService, TasksService, UsersService } from '@/core/services';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

interface EditTaskDialogProps {
	task: ITask;
	users: OUser[];
}

export const EditTaskDialog = ({ task, users }: EditTaskDialogProps) => {
	const router = useRouter();

	const [dueDate, setDueDate] = useState<string>(task.due_date);
	const [userAssignee, setUsersAssingee] = useState<IUser | undefined>();
	const [projects, setProjects] = useState<OProject[]>([]);

	const [deleteAlert, setDeleteAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [errors, setErrors] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		UsersService.getUser(task.assignee_id).then((user) => setUsersAssingee(user));
		ProjectsService.getProjects().then(({ data }) => setProjects(data));
	}, []);

	const initialValues = {
		title: task?.title,
		description: task?.description,
		due_date: task?.due_date,
		status: task?.status,
		assignee_id: userAssignee?.id,
		project_id: task.project_id,
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string(),
		description: Yup.string(),
		due_date: Yup.string(),
		status: Yup.string().oneOf(Object.values(TaskState), 'Invalid state'),
		assignee_id: Yup.string(),
		project_id: Yup.string(),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			await TasksService.updateTask({
				id: task.id,
				title: values.title,
				description: values.description,
				due_date: values.due_date,
				status: values.status,
				assignee_id: values.assignee_id,
				project_id: values.project_id,
			})
				.then((task) => {
					setIsOpen(false);
					router.refresh();
				})
				.catch((error) => {
					setErrors(true);
					setErrorMessage(error.response.data.message);
				})
				.finally(() => setLoading(false));
		},
	});

	async function handleDelete(task_id: string) {
		const { is_active } = await TasksService.deleteTask(task_id);
		if (is_active) return;
		setDeleteAlert(false);
		router.refresh();
	}

	return (
		<>
			<div className='flex gap-2'>
				<>
					<div className='flex gap-2'>
						<Button
							type='button'
							color='red'
							onClick={() => setDeleteAlert(true)}>
							Delete
						</Button>
						<Button
							type='button'
							color='light'
							onClick={() => setIsOpen(true)}>
							Edit
						</Button>
						<Button
							type='button'
							color='light'
							onClick={() => router.push(task.project_id + '/' + task.id)}>
							View
						</Button>
					</div>
					<AlertDialog
						open={deleteAlert}
						onClose={setDeleteAlert}>
						<AlertTitle>Are you sure you want to delete this task?</AlertTitle>
						<AlertDescription>Deleting this task will remove all associated data permanently.</AlertDescription>
						<AlertActions>
							<Button
								plain
								onClick={() => setDeleteAlert(false)}>
								Cancel
							</Button>
							<Button
								color='red'
								onClick={() => handleDelete(task.id)}>
								Confirm
							</Button>
						</AlertActions>
					</AlertDialog>
				</>
			</div>
			<Dialog
				open={isOpen}
				onClose={setIsOpen}>
				<DialogTitle>Edit project</DialogTitle>
				<DialogDescription>
					Modify values of <Strong> {task.title}</Strong> here.
				</DialogDescription>
				<form onSubmit={formik.handleSubmit}>
					<DialogBody className='grid gap-4'>
						{errors && (
							<Alert
								title='Error'
								descriptions={errorMessage}
							/>
						)}
						<Field>
							<Label>Name</Label>
							<Input
								name='title'
								placeholder={task.title}
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Field>

						<Field>
							<Label>Description</Label>
							<Textarea
								name='description'
								placeholder={task.description}
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Field>

						<Divider />

						<Field className='flex gap-2 items-end justify-between'>
							<Label>Due date</Label>
							<DatePicker
								date={dueDate}
								setDate={setDueDate}
							/>
						</Field>

						<Field>
							<Label>Project</Label>
							<Select
								name='project_id'
								value={formik.values.project_id}
								onChange={formik.handleChange}>
								{projects.map((project) => (
									<option
										key={project.id}
										value={project.id}>
										{project.name}
									</option>
								))}
							</Select>
						</Field>

						<Field>
							<Label>Assignee</Label>
							<Select
								name='assignee_id'
								defaultValue={task.assignee_id}
								value={formik.values.assignee_id}
								onChange={formik.handleChange}>
								{users?.map((user) => (
									<option
										key={user.id}
										value={user.id}>
										{user.name}
									</option>
								))}
							</Select>
						</Field>

						<Field>
							<Label>Status</Label>
							<Select
								name='status'
								defaultValue={task.status}
								value={formik.values.status}
								onChange={formik.handleChange}>
								{TaskStateList?.map((status) => (
									<option
										key={status}
										value={status}>
										{status}
									</option>
								))}
							</Select>
						</Field>
					</DialogBody>
					<DialogActions>
						<Button
							plain
							onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
						<Button
							type='submit'
							loading={loading}>
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};
