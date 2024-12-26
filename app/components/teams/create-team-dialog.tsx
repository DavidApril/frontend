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
	Select,
	Checkbox,
	CheckboxField,
	Fieldset,
	Legend,
	CheckboxGroup,
	Description,
} from '@/core/components';
import { useAuthStore } from '@/core/store';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { OProject, OUser } from '@/core/interfaces';
import { AuthService, ProjectsService, TeamsService } from '@/core/services';

export const CreateTeamDialog = () => {
	const router = useRouter();

	const { user } = useAuthStore();

	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState([]);

	const [projects, setProjects] = useState<OProject[]>([]);
	const [users, setUsers] = useState<OUser[]>([]);

	const initialValues = {
		name: 'team#01',
		description: 'description of proyect#01',
		project_id: '',
		members: [],
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		project_id: Yup.string().required('Project is required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			await TeamsService.createTeam({
				name: values.name,
				description: values.description,
				owner: user.id,
				project_id: values.project_id,
				members: values.members,
			})
				.then((response) => {
					router.push(`${values.project_id}/${response.id}`);
				})
				.catch((error) => {
					setErrors(true);
					setErrorMessage(error.response.data.message);
				})
				.finally(() => setLoading(false));
		},
	});

	useEffect(() => {
		const getUsers = async () => {
			const { users } = await AuthService.getUsers();
			setUsers(users);
		};
		getUsers();
	}, []);

	useEffect(() => {
		const getProjects = async () => {
			const { data } = await ProjectsService.getProjects();
			setProjects(data);
		};
		getProjects();
	}, []);

	useEffect(() => {
		console.log(formik.values);
	}, [formik.values]);

	return (
		<>
			<Button
				type='button'
				className='inline-flex items-center gap-2'
				onClick={() => setIsOpen(true)}>
				New team
			</Button>
			<Dialog
				open={isOpen}
				onClose={setIsOpen}>
				<DialogTitle>Create team</DialogTitle>
				<DialogDescription>Create a new team here.</DialogDescription>
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
								name='name'
								placeholder='Team name'
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Field>

						<Field>
							<Label>Description</Label>
							<Textarea
								name='description'
								placeholder='Team description'
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
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
						{/* <Field>
							<Legend>Members</Legend>
							<CheckboxGroup>
								{users.map((user) => (
									<Checkbox
										name='members'
										value={user.id}
									/>
								))}
							</CheckboxGroup>
						</Field> */}
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
