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
	Textarea,
	Alert,
	Divider,
	DatePicker,
	Select,
} from '@/core/components';
import { OUser, TaskState, TaskStateList } from '@/core/interfaces';
import { TasksService } from '@/core/services';
import { useAuthStore } from '@/core/store';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

interface CreateTaskDialogProps {
	project_id: string;
	users: OUser[];
}

export const CreateTaskDialog = ({ project_id, users }: CreateTaskDialogProps) => {
	const router = useRouter();

	const { user } = useAuthStore();

	const [dueDate, setDueDate] = useState<string>('');

	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const initialValues = {
		title: 'test task',
		description: 'description of test task',
		due_date: new Date(Date.now()),
		status: TaskState.TODO,
		assignee_id: users[0].id,
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
		description: Yup.string().required('Description is required'),
		due_date: Yup.date().required('Due date is required'),
		status: Yup.string().oneOf(Object.values(TaskState), 'Invalid state').required('State is required'),
		assignee_id: Yup.string().required('Assignee is required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			await TasksService.createTask({
				title: values.title,
				description: values.description,
				due_date: dueDate,
				status: values.status,
				assignee_id: values.assignee_id,
				project_id: project_id,
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

	return (
		<>
			<Button
				type='button'
				color='light'
				className='inline-flex items-center gap-2'
				onClick={() => setIsOpen(true)}>
				New task
			</Button>
			<Dialog
				open={isOpen}
				onClose={setIsOpen}>
				<DialogTitle>Create task</DialogTitle>
				<DialogDescription>Create a new task here.</DialogDescription>
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
								placeholder='Task title'
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Field>

						<Field>
							<Label>Description</Label>
							<Textarea
								name='description'
								placeholder='Task description'
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
							<Label>Assignee</Label>
							<Select
								name='assignee_id'
								value={formik.values.assignee_id}
								defaultValue={users[0].id}
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
								defaultValue={TaskState.TODO}
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
							Create
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};
