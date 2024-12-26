'use client';

import { Button, Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions, Field, Label, Input, Textarea, Alert } from '@/core/components';
import { ProjectsService } from '@/core/services';
import { useAuthStore } from '@/core/store';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

export const CreateProjectDialog = () => {
	const router = useRouter();

	const { user } = useAuthStore();

	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const initialValues = {
		name: 'test project',
		description: 'description of test project',
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			await ProjectsService.createProject({
				name: values.name,
				description: values.description,
				owner: user.id,
			})
				.then((response) => router.push(response.id))
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
				className='inline-flex items-center gap-2'
				onClick={() => setIsOpen(true)}>
				New project
			</Button>
			<Dialog
				open={isOpen}
				onClose={setIsOpen}>
				<DialogTitle>Create project</DialogTitle>
				<DialogDescription>Create a new project here.</DialogDescription>
				<form onSubmit={formik.handleSubmit}>
					<DialogBody className='grid gap-4'>
						{errors && (
							<Alert
								title='Error'
								description={errorMessage}
							/>
						)}
						<Field>
							<Label>Name</Label>
							<Input
								name='name'
								placeholder='Project name'
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Field>

						<Field>
							<Label>Description</Label>
							<Textarea
								name='description'
								placeholder='Project description'
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
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
